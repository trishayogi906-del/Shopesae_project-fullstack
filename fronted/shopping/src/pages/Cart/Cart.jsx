import { Link } from "react-router-dom";
import { CartItem, PriceDetails } from "../../components/Cart";
import useCart from "../../hooks/useCart";

export default function Cart() {
    const { items } = useCart();

    if (!items.length) {
        return (
            <div className="py-16 text-center">
                <h1 className="text-xl font-bold">Your cart is empty</h1>
                <p className="mt-2 text-stone-500">Add something you like and it will show up here.</p>
                <Link to="/products" className="mt-5 inline-block rounded-lg bg-teal-700 px-5 py-2 text-sm font-medium text-white hover:bg-teal-800">
                    Browse products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-5 text-2xl font-bold">My cart</h1>
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <ul className="space-y-3">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </ul>
                <PriceDetails>
                    <Link to="/checkout" className="mt-4 block rounded-lg bg-teal-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-800">
                        Checkout
                    </Link>
                </PriceDetails>
            </div>
        </div>
    );
}
