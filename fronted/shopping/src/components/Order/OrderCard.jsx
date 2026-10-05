import { formatPrice } from "../../utilits/formatPrice";

const statusStyles = {
  placed: "bg-teal-50 text-teal-800",
  shipped: "bg-amber-50 text-amber-800",
  delivered: "bg-green-50 text-green-800",
  cancelled: "bg-red-50 text-red-700",
};

export default function OrderCard({ order }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li className="rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div>
          <p className="font-medium">Order #{order.id.slice(-6).toUpperCase()}</p>
          <p className="text-stone-500">
            {date}, {order.paymentMethod === "cod" ? "Cash on delivery" : "Online payment"}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[order.status]}`}>
          {order.status}
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {order.items.map((i) => (
          <li key={i.product} className="flex items-center gap-3 text-sm">
            <img src={i.image} alt="" className="h-10 w-10 rounded bg-stone-100 object-contain" />
            <span className="flex-1 truncate">
              {i.title} &times; {i.qty}
            </span>
            <span>{formatPrice(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-stone-200 pt-3 text-right text-sm font-semibold">
        Total {formatPrice(order.total)}
      </p>
    </li>
  );
}
