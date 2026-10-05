import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../ui";

export default function LoginForm({ onSubmit, error, loading }) {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl font-bold">Login</h1>
            {error && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </p>
            )}
            <Input name="email" type="email" label="Email" placeholder="name@company.com" value={form.email} onChange={handleChange} required />
            <Input name="password" type="password" label="Password" value={form.password} onChange={handleChange} required />
            <Button type="submit" className="w-full disabled:opacity-60" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center text-sm text-stone-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-teal-700 hover:underline">
                    Create account
                </Link>
            </p>
        </form>
    );
}
