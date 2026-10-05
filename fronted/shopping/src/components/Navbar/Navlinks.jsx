import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
    `border-b-2 px-2 py-1 text-sm transition-colors ${isActive
        ? "border-teal-700 font-medium text-teal-700"
        : "border-transparent text-stone-600 hover:text-stone-900"
    }`;

export default function NavLinks({ links }) {
    return (
        <nav className="flex items-center gap-1">
            {links.map(({ label, to }) => (
                <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
                    {label}
                </NavLink>
            ))}
        </nav>
    );
}
