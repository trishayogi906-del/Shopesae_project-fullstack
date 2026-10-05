import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function useProducts(params) {
    const [state, setState] = useState({ products: [], loading: true, error: null });
    const key = JSON.stringify(params);

    useEffect(() => {
        let ignore = false;
        setState((s) => ({ ...s, loading: true, error: null }));
        getProducts(JSON.parse(key))
            .then((products) => !ignore && setState({ products, loading: false, error: null }))
            .catch((e) => !ignore && setState({ products: [], loading: false, error: e.message }));
        return () => {
            ignore = true;
        };
    }, [key]);

    return state;
}
