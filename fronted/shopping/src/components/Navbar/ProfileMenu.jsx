import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// top-right avatar (first letter of the name) with a small dropdown
export default function ProfileMenu({ user, onLogout }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const firstName = user.name.split(" ")[0];

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-stone-100"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold uppercase text-white">
                    {firstName[0]}
                </span>
                <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-stone-200 bg-white p-2 shadow-lg"
                >
                    <div className="border-b border-stone-100 px-3 py-2">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="truncate text-xs text-stone-500">{user.email}</p>
                    </div>
                    <Link
                        to="/orders"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-stone-100"
                    >
                        My orders
                    </Link>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            setOpen(false);
                            onLogout();
                        }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
