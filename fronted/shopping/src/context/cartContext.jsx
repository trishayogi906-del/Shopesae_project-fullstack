import { createContext, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getCart, saveCart } from "../services/cartService";

export const CartContext = createContext(null);

const GUEST_KEY = "shopease_cart_v2"; // cart of a visitor who is not logged in
const DELIVERY_FEE = 40;

function loadGuestCart() {
    try {
        return JSON.parse(localStorage.getItem(GUEST_KEY)) || [];
    } catch {
        return [];
    }
}

const toPayload = (items) => items.map((i) => ({ productId: i.id, qty: i.qty }));

// add guest items on top of the items already saved in the user's account
function mergeItems(saved, guest) {
    const map = new Map(saved.map((i) => [i.id, { ...i }]));
    for (const g of guest) {
        const found = map.get(g.id);
        if (found) found.qty += g.qty;
        else map.set(g.id, { ...g });
    }
    return [...map.values()];
}

export function CartProvider({ children }) {
    const { user, loading: authLoading } = useAuth();
    const userId = user?.id ?? null;

    const [items, setItems] = useState(loadGuestCart);
    // who the current `items` belong to: "guest" or a user id.
    // Saving only happens when this matches the logged-in user, so one user's cart never leaks into another's.
    const ownerRef = useRef("guest");

    // 1) load the right cart whenever the logged-in user changes (login / logout / page refresh)
    useEffect(() => {
        if (authLoading) return;
        let ignore = false;

        if (!userId) {
            ownerRef.current = "pending"; // the save step below flips this to "guest" and skips the stale write
            setItems(loadGuestCart());
            return;
        }

        (async () => {
            let next = [];
            try {
                const { items: saved } = await getCart();
                next = saved;
                const guest = loadGuestCart();
                if (guest.length) {
                    const res = await saveCart(toPayload(mergeItems(saved, guest)));
                    next = res.items;
                    localStorage.removeItem(GUEST_KEY);
                }
            } catch {
                // server problem: show an empty cart rather than someone else's
            }
            if (ignore) return;
            ownerRef.current = userId;
            setItems(next);
        })();

        return () => {
            ignore = true;
        };
    }, [userId, authLoading]);

    // 2) save every change: to the database for a logged-in user, to localStorage for a guest
    useEffect(() => {
        if (authLoading) return;
        if (ownerRef.current === "pending") {
            ownerRef.current = "guest"; // guest cart was just loaded, `items` is about to update
            return;
        }
        const owner = userId ?? "guest";
        if (ownerRef.current !== owner) return; // items still belong to the previous owner

        if (!userId) {
            localStorage.setItem(GUEST_KEY, JSON.stringify(items));
            return;
        }
        const timer = setTimeout(() => saveCart(toPayload(items)).catch(() => { }), 400);
        return () => clearTimeout(timer);
    }, [items, userId, authLoading]);

    const addToCart = (product) =>
        setItems((prev) => {
            const found = prev.find((i) => i.id === product.id);
            if (found) {
                return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
            }
            const { id, title, image, price } = product;
            return [...prev, { id, title, image, price, qty: 1 }];
        });

    const updateQty = (id, delta) =>
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
        );

    const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
    const clearCart = () => setItems([]);

    const totalItems = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    const deliveryFee = items.length ? DELIVERY_FEE : 0;

    const value = {
        items,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
