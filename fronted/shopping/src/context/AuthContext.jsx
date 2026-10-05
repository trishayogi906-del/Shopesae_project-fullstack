import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while we check the saved session

    useEffect(() => {
        authService
            .getMe()
            .then(({ user }) => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (credentials) => {
        const { user } = await authService.login(credentials);
        setUser(user);
    };

    const register = async (details) => {
        const { user } = await authService.register(details);
        setUser(user);
    };

    const logout = async () => {
        await authService.logout().catch(() => { });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}