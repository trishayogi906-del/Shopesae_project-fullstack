import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utilits/formatPrice";

function Row({ label, value, bold }) {
    return (
        <div className={`flex justify-between ${bold ? "font-semibold" : ""}`}>
            <dt>{label}</dt>
            <dd>{value}</dd>
        </div>
    );
}

export default function PriceDetails({ children }) {
    const { subtotal, deliveryFee, total } = useCart();

    return (
        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-4">
            <h2 className="mb-3 font-medium">Price details</h2>
            <dl className="space-y-2 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Delivery" value={formatPrice(deliveryFee)} />
                <div className="border-t border-stone-200 pt-2">
                    <Row label="Total" value={formatPrice(total)} bold />
                </div>
            </dl>
            {children}
        </aside>
    );
}
