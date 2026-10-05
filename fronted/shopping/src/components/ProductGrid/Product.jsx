import { ProductCard } from "../PrdouctCard";

const gridClass = "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4";

export default function ProductGrid({ products = [], loading, error, skeletons = 8 }) {
    if (error) {
        return <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>;
    }

    if (loading) {
        return (
            <div className={gridClass}>
                {Array.from({ length: skeletons }, (_, i) => (
                    <div key={i} className="aspect-3/4 animate-pulse rounded-xl bg-stone-200" />
                ))}
            </div>
        );
    }

    if (!products.length) {
        return <p className="text-sm text-stone-500">No products found. Try another category or search.</p>;
    }

    return (
        <div className={gridClass}>
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
