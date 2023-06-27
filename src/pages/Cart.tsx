import { useRouteLoaderData } from "react-router-dom"
import { ItemDropdown } from "../components/ItemDropdown"
import { CartItem } from "../types/cart"
import { useProducts } from "../hooks/useProducts"
import { useCart } from "../hooks/useCart"

export function Cart() {
  const { cart: initialCart } = useRouteLoaderData("root") as {
    cart: CartItem[]
  }

  const { data: cart } = useCart({
    initialData: initialCart,
  })

  const { data: products } = useProducts({
    enabled: cart && cart.length > 0,
  })

  const productsWithQuantity = products
    ?.filter((product) => cart?.some((item) => item.productId === product.id))
    .map((product) => {
      const item = cart?.find((item) => item.productId === product.id)
      return {
        ...product,
        quantity: item?.quantity,
        item,
      }
    })

  return (
    <div className="flex flex-col gap-3 md:w-4/5 lg:w-3/5 mx-auto bg-zinc-100 shadow-sm px-4 py-4 rounded-md">
      {cart?.length === 0 ? (
        <div className="text-2xl text-center my-2">Your cart is empty.</div>
      ) : (
        productsWithQuantity?.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row justify-between bg-white px-2 py-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <span className="font-medium text-lg">{product.name}</span>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div className="flex flex-col w-32">
                <span className="flex justify-between">
                  Price: <span>${product.price}</span>
                </span>
                <span className="flex justify-between">
                  Quantity: <span>{product.quantity}</span>
                </span>
                <span className="flex justify-between">
                  Total: <span>${product.quantity! * product.price}</span>
                </span>
              </div>
              {product.item && <ItemDropdown item={product.item} />}
            </div>
          </div>
        ))
      )}
      <div className="flex flex-col items-end py-2 px-2">
        <h3 className="text-2xl font-semibold">Total</h3>
        <span className="text-3xl font-medium">
          $
          {productsWithQuantity?.reduce(
            (acc, product) => acc + product.quantity! * product.price,
            0
          )}
        </span>
      </div>
    </div>
  )
}
