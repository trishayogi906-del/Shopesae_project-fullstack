import { Input } from "../ui";

export default function AddressForm({ values, errors, onChange }) {
    const field = (name, label, props = {}) => (
        <Input
            name={name}
            label={label}
            value={values[name]}
            error={errors[name]}
            onChange={onChange}
            {...props}
        />
    );

    return (
        <section className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
            <h2 className="font-medium">Delivery address</h2>
            {field("name", "Name", { autoComplete: "name" })}
            {field("phone", "Phone", { type: "tel", inputMode: "numeric", maxLength: 10 })}
            {field("address", "Address", { autoComplete: "street-address" })}
            <div className="grid grid-cols-2 gap-3">
                {field("city", "City")}
                {field("pincode", "Pincode", { inputMode: "numeric", maxLength: 6 })}
            </div>
        </section>
    );
}
