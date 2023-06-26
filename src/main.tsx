import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./layouts/Root"
import { Products } from "./pages/Products"
import { Cart } from "./pages/Cart"
import { Toaster } from "react-hot-toast"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getProducts } from "./api/getProducts"
import { getCart } from "./api/cart"

// Routes
// - Products Page -> Homepage
// - Cart Page
// - Add Product
// - Edit Product
// - Profile Page for the user maybe?

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: async () => {
      const cart = await getCart()
      const products = await getProducts()
      // Filter out products that are not in the cart
      const filteredProducts = products.filter((product) =>
        cart.some((item) => item.productId === product.id)
      );
      return { cart, products: filteredProducts };
    },
    children: [
      {
        index: true,
        element: <Products />,
        loader: async () => {
          const products = await getProducts();
          return { products };
        },
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
