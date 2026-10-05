import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utilits/formatPrice";

export default function OrderSummary() {
  const { items, deliveryFee, total } = useCart();

  return (
    <section>
      <h2 className="mb-3 font-medium">Order summary</h2>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between gap-3">
            <span className="truncate">
              {i.title} &times; {i.qty}
            </span>
            <span>{formatPrice(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 space-y-1 border-t border-stone-200 pt-3 text-sm">
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{formatPrice(deliveryFee)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </section>
  );
}
