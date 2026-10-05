import { useSearchParams } from "react-router-dom";
import { CategoryList } from "../../components/CategoryList";
import { ProductGrid } from "../../components/ProductGrid";
import useProducts from "../../hooks/useProducts";

export default function Products() {
  const [params] = useSearchParams();
  const category = params.get("category") || "all";
  const search = params.get("q") || "";
  const { products, loading, error } = useProducts({ category, search });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">{search ? `Results for "${search}"` : "Products"}</h1>
      <CategoryList active={search ? undefined : category} />
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
  );
}
