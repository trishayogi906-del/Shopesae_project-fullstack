const options = [
    { value: "cod", label: "Cash on delivery" },
    { value: "online", label: "Online payment" },
];

export default function PaymentMethod({ value, onChange }) {
    return (
        <fieldset className="mt-4 space-y-2">
            <legend className="mb-2 text-sm font-medium">Payment method</legend>
            {options.map((o) => (
                <label key={o.value} className="flex items-center gap-2 text-sm">
                    <input
                        type="radio"
                        name="payment"
                        value={o.value}
                        checked={value === o.value}
                        onChange={() => onChange(o.value)}
                        className="accent-teal-700"
                    />
                    {o.label}
                </label>
            ))}
        </fieldset>
    );
}
