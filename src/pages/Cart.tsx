<<<<<<< HEAD
import { useRouteLoaderData } from "react-router-dom";
import { CartItem } from "../types/cart";
import { Product } from "../types/products";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { ItemDropdown } from "../components/ItemDropdown";

export function Cart() {
  const { cart: initialCart } = useRouteLoaderData("root") as {
    cart: CartItem[];
    products: Product[];
  };

  const { data: cart } = useCart({
    initialData: initialCart,
  });

  const { data: products } = useProducts({
    enabled: cart && cart.length > 0,
  });

  const productsWithQuanty = products
    ?.filter((product) => {
      return cart?.some((item) => item.productId === product.id);
    })
    .map((product) => {
      const item = cart?.find((item) => item.productId === product.id);
      return {
        ...product,
        quantity: item ? item.quantity : 0,
        item: item,
      };
    });

  return (
    <div className="flex flex-col gap-4">
      {productsWithQuanty?.map((product) => (
        <div key={product.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover"
            />
            <span className="font-medium text-lg">{product.name}</span>
=======
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
    initialData: initialCart
  })

  const { data: products } = useProducts({
    enabled: cart && cart.length > 0
  })

  const productsWithQuantity = products?.filter(product => cart?.some(item => item.productId === product.id)).map((product) => {
    const item = cart?.find((item) => item.productId === product.id);
    return {
      ...product,
      quantity: item?.quantity,
      item,
    }
    })

  return (
    <div className="flex flex-col gap-4">
      {
        cart?.length === 0 ? <div>Your Cart is empty.</div> : productsWithQuantity?.map((product) => (
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
              <span>Quantity: {product.quantity}</span>
              <span>Total: ${product.quantity! * product.price}</span>
              {product.item && <ItemDropdown item={product.item} />}
            </div>
>>>>>>> react-query-exercise
          </div>
        ))
      }
      <div className="flex flex-col items-end">
        <h3 className="text-2xl font-semibold">Total</h3>
        <span className="text-3xl font-medium">
          $
<<<<<<< HEAD
          {productsWithQuanty?.reduce(
            (acc, product) => acc + product.quantity * product.price,
=======
          {productsWithQuantity?.reduce(
            (acc, product) => acc + product.quantity! * product.price,
>>>>>>> react-query-exercise
            0
          )}
        </span>
      </div>
    </div>
  );
}
