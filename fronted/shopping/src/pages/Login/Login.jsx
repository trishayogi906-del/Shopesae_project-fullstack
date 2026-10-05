import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/Auth";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (user) return <Navigate to="/" replace />;

    const handleLogin = async (form) => {
        setLoading(true);
        setError("");
        try {
            await login(form);
            navigate(location.state?.from || "/", { replace: true });
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return <LoginForm onSubmit={handleLogin} error={error} loading={loading} />;
}