import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import ProfileMenu from "./profileMenu";
import { authLinks } from "../../data/navLinks";
import useAuth from "../../hooks/useAuth";

export default function AuthLinks() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    if (loading) return null; // avoids a Login/Register flash while the session is checked
    if (!user) return <NavLinks links={authLinks} />;

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return <ProfileMenu user={user} onLogout={handleLogout} />;
}
