import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <Outlet />
        </div>
    );
}
