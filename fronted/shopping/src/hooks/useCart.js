import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}