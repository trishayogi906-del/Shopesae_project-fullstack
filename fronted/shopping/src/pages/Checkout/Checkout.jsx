import { useState } from "react";
import { Link } from "react-router-dom";
import { AddressForm, OrderSummary, PaymentMethod } from "../../components/Checkout";
import { Button } from "../../components/ui";
import useCart from "../../hooks/useCart";
import { createOrder } from "../../services/orderService";

const initialValues = { name: "", phone: "", address: "", city: "", pincode: "" };

function validate(v) {
    const errors = {};
    if (!v.name.trim()) errors.name = "Enter your name";
    if (!/^\d{10}$/.test(v.phone)) errors.phone = "Enter a 10-digit phone number";
    if (!v.address.trim()) errors.address = "Enter your address";
    if (!v.city.trim()) errors.city = "Enter your city";
    if (!/^\d{6}$/.test(v.pincode)) errors.pincode = "Enter a 6-digit pincode";
    return errors;
}

export default function Checkout() {
    const { items, clearCart } = useCart();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [payment, setPayment] = useState("cod");
    const [placed, setPlaced] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        setErrors((er) => ({ ...er, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length) return;

        setSubmitting(true);
        setSubmitError("");
        try {
            // only ids and quantities go to the server; it calculates prices itself
            await createOrder({
                items: items.map((i) => ({ productId: i.id, qty: i.qty })),
                address: values,
                paymentMethod: payment,
            });
            clearCart();
            setPlaced(true);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (placed) {
        return (
            <div className="py-16 text-center">
                <h1 className="text-xl font-bold">Order placed</h1>
                <p className="mt-2 text-stone-500">Thanks for shopping with ShopEase.</p>
                <div className="mt-5 flex justify-center gap-3">
                    <Link to="/orders" className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-medium text-white hover:bg-teal-800">
                        View my orders
                    </Link>
                    <Link to="/products" className="rounded-lg border border-stone-300 bg-white px-5 py-2 text-sm font-medium hover:bg-stone-100">
                        Continue shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="py-16 text-center">
                <h1 className="text-xl font-bold">Nothing to check out</h1>
                <Link to="/products" className="mt-4 inline-block text-teal-700 hover:underline">
                    Browse products
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h1 className="mb-5 text-2xl font-bold">Checkout</h1>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <AddressForm values={values} errors={errors} onChange={handleChange} />
                <div className="h-fit rounded-xl border border-stone-200 bg-white p-4">
                    <OrderSummary />
                    <PaymentMethod value={payment} onChange={setPayment} />
                    {submitError && (
                        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {submitError}
                        </p>
                    )}
                    <Button type="submit" className="mt-5 w-full disabled:opacity-60" disabled={submitting}>
                        {submitting ? "Placing order..." : "Place order"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
