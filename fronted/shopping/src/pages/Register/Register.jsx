import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/Auth";
import useAuth from "../../hooks/useAuth";

export default function Register() {
    const { user, register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (user) return <Navigate to="/" replace />;

    const handleRegister = async (details) => {
        setLoading(true);
        setError("");
        try {
            await register(details); // backend logs the user in right after register
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return <RegisterForm onSubmit={handleRegister} error={error} loading={loading} />;
}
