import { useLoaderData } from "react-router-dom"
import { Product } from "../types/products"
import { ProductCard } from "../components/ProductCard"
import { useProducts } from "../hooks/useProducts"

export function Products() {
  const { products: initialProducts } = useLoaderData() as { products: Product[] }
  const { data: products } = useProducts({
    initialData: initialProducts,
    refetchInterval: 1000 * 60 * 60,
  })

  const { isSuccess, isLoading, isError, data } = useProducts({
    initialData: products,
  });

  console.log({ isSuccess, isLoading, isError, data });
  return (
    <div>
      <h2 className="text-3xl mb-8 font-semibold"> All products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
