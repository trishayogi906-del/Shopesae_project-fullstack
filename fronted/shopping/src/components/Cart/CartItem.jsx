import { QuantityStepper, TrashIcon } from "../ui";
import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utilits/formatPrice";

export default function CartItem({ item }) {
    const { updateQty, removeItem } = useCart();

    return (
        <li className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-3">
            <img src={item.image} alt={item.title} className="h-20 w-20 rounded-lg bg-stone-100 object-contain" />
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium">{item.title}</h3>
                <p className="text-sm text-stone-500">{formatPrice(item.price)}</p>
                <div className="mt-2">
                    <QuantityStepper value={item.qty} onChange={(delta) => updateQty(item.id, delta)} />
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => removeItem(item.id)}
                    className="text-stone-400 hover:text-red-600"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </li>
    );
}
