import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${active
        ? "border-teal-700 bg-teal-50 font-medium text-teal-800"
        : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
    }`;

export default function CategoryList({ active }) {
    return (
        <div className="flex flex-wrap gap-2">
            {active !== undefined && (
                <Link to="/products" className={chip(active === "all")}>
                    All
                </Link>
            )}
            {categories.map(({ label, slug }) => (
                <Link key={slug} to={`/products?category=${slug}`} className={chip(active === slug)}>
                    {label}
                </Link>
            ))}
        </div>
    );
}
