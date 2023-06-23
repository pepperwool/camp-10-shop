import { useRouteLoaderData } from "react-router-dom"
import { ItemDropdown } from "../components/ItemDropdown"
import { CartItem } from "../types/cart"
import { Product } from "../types/products"

export function Cart() {
  const { cart, products } = useRouteLoaderData("root") as {
    cart: CartItem[]
    products: Product[]
  }

  return (
    <div>
      {products.map((product) => {
        const item = cart.find((item) => item.productId === product.id)
        const quantity = item?.quantity || 0
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
              {item && <ItemDropdown item={item} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
