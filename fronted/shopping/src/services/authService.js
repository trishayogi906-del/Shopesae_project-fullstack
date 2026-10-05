import { api } from "./api";

export const register = (data) => api("/auth/register", { method: "POST", body: data });
export const login = (data) => api("/auth/login", { method: "POST", body: data });
export const logout = () => api("/auth/logout", { method: "POST" });
export const getMe = () => api("/auth/me");
