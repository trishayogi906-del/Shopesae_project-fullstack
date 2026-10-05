import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../ui";

export default function RegisterForm({ onSubmit, error, loading }) {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [mismatch, setMismatch] = useState("");

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        setMismatch("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return setMismatch("Passwords don't match");
        onSubmit({ name: form.name, email: form.email, password: form.password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl font-bold">Register</h1>
            {error && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </p>
            )}
            <Input name="name" label="Name" value={form.name} onChange={handleChange} required />
            <Input name="email" type="email" label="Email" placeholder="name@company.com" value={form.email} onChange={handleChange} required />
            <Input name="password" type="password" label="Password" minLength={6} value={form.password} onChange={handleChange} required />
            <Input name="confirm" type="password" label="Confirm password" error={mismatch} value={form.confirm} onChange={handleChange} required />
            <Button type="submit" className="w-full disabled:opacity-60" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
            </Button>
            <p className="text-center text-sm text-stone-500">
                Already have an account?{" "}
                <Link to="/login" className="text-teal-700 hover:underline">
                    Login
                </Link>
            </p>
        </form>
    );
}
