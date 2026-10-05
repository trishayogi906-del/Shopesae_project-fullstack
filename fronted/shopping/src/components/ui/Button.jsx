const variants = {
    primary: "bg-teal-700 text-white hover:bg-teal-800",
    outline: "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100",
};

export default function Button({ variant = "primary", className = "", ...props }) {
    return (
        <button
            {...props}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${variants[variant]} ${className}`}
        />
    );
}
