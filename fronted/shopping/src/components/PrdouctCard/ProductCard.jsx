import { Button, Rating } from "../ui";
import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utilits/formatPrice";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
            <div className="aspect-square bg-stone-100">
                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-3">
                <h3 className="line-clamp-1 text-sm font-medium">{product.title}</h3>
                <Rating value={product.rating} />
                <p className="mb-2 flex items-baseline gap-2">
                    <span className="font-semibold">{formatPrice(product.price)}</span>
                    <span className="text-xs text-stone-400 line-through">{formatPrice(product.mrp)}</span>
                </p>
                <Button className="mt-auto" onClick={() => addToCart(product)}>
                    Add to cart
                </Button>
            </div>
        </article>
    );
}
