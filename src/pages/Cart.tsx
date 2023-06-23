import { useRouteLoaderData } from "react-router-dom"
import { CartItem } from "../types/cart"
import { Product } from "../types/products"

export function Cart() {
  const { cart, products } = useRouteLoaderData("root") as {
    cart: CartItem[]
    products: Product[]
  }
  console.log(cart)
  return (
    <div>
      {products.map((product) => {
        const quantity =
          cart.find((item) => item.productId === product.id)?.quantity || 0
        return (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <span className="font-medium text-lg">{product.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Price: ${product.price}</span>
              <span>Quantity: {quantity}</span>
              <span>Total: ${quantity * product.price}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
