import { api } from "./api";

export const getCart = () => api("/cart");
// items: [{ productId, qty }]
export const saveCart = (items) => api("/cart", { method: "PUT", body: { items } });
