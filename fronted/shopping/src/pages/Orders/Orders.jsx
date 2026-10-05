import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrderCard } from "../../components/Order";
import { getMyOrders } from "../../services/orderService";

export default function Orders() {
    const [state, setState] = useState({ orders: [], loading: true, error: null });

    useEffect(() => {
        getMyOrders()
            .then(({ orders }) => setState({ orders, loading: false, error: null }))
            .catch((e) => setState({ orders: [], loading: false, error: e.message }));
    }, []);

    const { orders, loading, error } = state;

    return (
        <div>
            <h1 className="mb-5 text-2xl font-bold">My orders</h1>
            {loading && <p className="text-stone-500">Loading your orders...</p>}
            {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {!loading && !error && !orders.length && (
                <div className="py-12 text-center">
                    <p className="text-stone-500">You haven't placed any orders yet.</p>
                    <Link to="/products" className="mt-3 inline-block text-teal-700 hover:underline">
                        Browse products
                    </Link>
                </div>
            )}
            {!!orders.length && (
                <ul className="space-y-3">
                    {orders.map((o) => (
                        <OrderCard key={o.id} order={o} />
                    ))}
                </ul>
            )}
        </div>
    );
}
