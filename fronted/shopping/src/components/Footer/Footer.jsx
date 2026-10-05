import { Link } from "react-router-dom";
import { footerLinks } from "../../data/footerLinks";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-stone-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} ShopEase</p>
        <nav className="flex gap-4">
          {footerLinks.map(({ label, to }) => (
            <Link key={label} to={to} className="hover:text-stone-900">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
