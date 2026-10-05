import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="py-16 text-center">
            <h1 className="text-xl font-bold">Page not found</h1>
            <p className="mt-2 text-stone-500">The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-4 inline-block text-teal-700 hover:underline">
                Go to home
            </Link>
        </div>
    );
}
