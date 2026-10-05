export default function Input({ label, error, className = "", ...props }) {
    return (
        <label className="block text-sm">
            <span className="mb-1 block text-stone-600">{label}</span>
            <input
                {...props}
                className={`w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 ${error ? "border-red-500" : "border-stone-300"
                    } ${className}`}
            />
            {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
        </label>
    );
}
