import { api } from "./api";

export const createOrder = (data) => api("/orders", { method: "POST", body: data });
export const getMyOrders = () => api("/orders/my");
