import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./layouts/Root"
import { Products } from "./pages/Products"
import axios from "axios"

// Routes
// - Products Page -> Homepage
// - Cart Page
// - Add Product
// - Edit Product
// - Profile Page for the user maybe?

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: async () => {
          const { data } = await axios.get("http://localhost:3000/products")
          return { products: data }
        },
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
