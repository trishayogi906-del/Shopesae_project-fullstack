import Logo from "./Logo";
import NavLinks from "./Navlinks";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";
import AuthLinks from "./AuthLinks";
import { mainLinks } from "../../data/navLinks";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
                <Logo />
                <NavLinks links={mainLinks} />
                <SearchBar className="order-last w-full md:order-none md:w-auto md:flex-1" />
                <div className="ml-auto flex items-center gap-2 md:ml-0">
                    <CartButton />
                    <AuthLinks />
                </div>
            </div>
        </header>
    );
}
