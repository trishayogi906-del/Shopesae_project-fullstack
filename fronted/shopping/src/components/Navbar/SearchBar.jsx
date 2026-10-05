import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../ui";

export default function SearchBar({ className = "" }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const q = query.trim();
        if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
    };

    return (
        <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
            />
        </form>
    );
}
