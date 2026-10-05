import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <section className="rounded-2xl bg-teal-800 px-6 py-12 text-white sm:px-10 sm:py-16">
            <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                Big sale, up to 50% off
            </h1>
            <p className="mt-3 max-w-md text-teal-50">
                Fresh deals on shoes, fashion, beauty, and electronics.
            </p>
            <Link
                to="/products"
                className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-teal-800 hover:bg-teal-50"
            >
                Shop now
            </Link>
        </section>
    );
}
