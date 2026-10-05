import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
