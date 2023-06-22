import { useLoaderData } from "react-router-dom"
import { Product } from "../types/products"
import { ProductCard } from "../components/ProductCard"

export function Products() {
  const { products } = useLoaderData() as { products: Product[] }

  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
