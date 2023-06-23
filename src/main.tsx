import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./layouts/Root"
import { Products } from "./pages/Products"
import axios from "axios"
import { Cart } from "./pages/Cart"
import { Product } from "./types/products"
import { CartItem } from "./types/cart"
import { Toaster } from "react-hot-toast"

// Routes
// - Products Page -> Homepage
// - Cart Page
// - Add Product
// - Edit Product
// - Profile Page for the user maybe?

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: async () => {
      const { data: cart } = await axios.get<CartItem[]>(
        "http://localhost:3000/cart"
      )
      const { data: products } = await axios.get<Product[]>(
        "http://localhost:3000/products"
      )
      // Filter out products that are not in the cart
      const filteredProducts = products.filter((product) =>
        cart.some((item) => item.productId === product.id)
      )
      return { cart, products: filteredProducts }
    },
    children: [
      {
        index: true,
        element: <Products />,
        loader: async () => {
          const { data: products } = await axios.get(
            "http://localhost:3000/products"
          )
          return { products }
        },
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
)
