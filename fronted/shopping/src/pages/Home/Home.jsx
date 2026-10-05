import { Link } from "react-router-dom";
import { Banner } from "../../components/Banner";
import { CategoryList } from "../../components/CategoryList";
import { ProductGrid } from "../../components/ProductGrid";
import useProducts from "../../hooks/useProducts";

function Section({ title, children }) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-bold">{title}</h2>
            {children}
        </section>
    );
}

function ViewAll() {
    return (
        <div className="mt-5 text-center">
            <Link to="/products" className="rounded-lg border border-stone-300 bg-white px-5 py-2 text-sm font-medium hover:bg-stone-100">
                View all
            </Link>
        </div>
    );
}

export default function Home() {
    const { products, loading, error } = useProducts({ category: "all" });

    return (
        <div className="space-y-10">
            <Banner />
            <Section title="Categories">
                <CategoryList />
            </Section>
            <Section title="Featured products">
                <ProductGrid products={products.slice(0, 4)} loading={loading} error={error} skeletons={4} />
                <ViewAll />
            </Section>
            <Section title="New arrivals">
                <ProductGrid products={products.slice(4, 8)} loading={loading} error={error} skeletons={4} />
                <ViewAll />
            </Section>
        </div>
    );
}
