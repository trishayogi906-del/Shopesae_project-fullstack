import { NavLink } from "react-router-dom";
import { CartIcon } from "../ui";
import useCart from "../../hooks/useCart";

export default function CartButton() {
    const { totalItems } = useCart();

    return (
        <NavLink
            to="/cart"
            className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm ${isActive ? "font-medium text-teal-700" : "text-stone-600 hover:text-stone-900"
                }`
            }
        >
            <CartIcon className="h-5 w-5" />
            Cart
            {totalItems > 0 && (
                <span className="rounded-full bg-teal-700 px-1.5 text-xs text-white">{totalItems}</span>
            )}
        </NavLink>
    );
}
