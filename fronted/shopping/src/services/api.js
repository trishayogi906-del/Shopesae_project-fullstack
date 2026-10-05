const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// credentials: "include" is required so the login cookie is sent with every request
export async function api(path, { method = "GET", body } = {}) {
    let res;
    try {
        res = await fetch(`${API_URL}${path}`, {
            method,
            credentials: "include",
            headers: body ? { "Content-Type": "application/json" } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new Error("Can't reach the server. Check your connection and try again.");
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const err = new Error(data.message || "Something went wrong");
        err.status = res.status;
        throw err;
    }
    return data;
}
