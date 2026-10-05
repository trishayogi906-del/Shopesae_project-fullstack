export default function QuantityStepper({ value, onChange }) {
    const btn = "px-3 py-1 hover:bg-stone-100";
    return (
        <div className="inline-flex items-center rounded-lg border border-stone-300">
            <button type="button" aria-label="Decrease quantity" className={btn} onClick={() => onChange(-1)}>
                -
            </button>
            <span className="min-w-8 text-center text-sm">{value}</span>
            <button type="button" aria-label="Increase quantity" className={btn} onClick={() => onChange(1)}>
                +
            </button>
        </div>
    );
}
