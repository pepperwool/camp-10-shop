<<<<<<< HEAD
import { Link, Outlet } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from "../hooks/useCart";

export function RootLayout() {
  const { data } = useCart();
  const cartAmount = data?.reduce((total, item) => total + item.quantity, 0);
=======
import { Link, Outlet } from "react-router-dom"
import { GiShoppingCart } from "react-icons/gi"
import { useCart } from "../hooks/useCart"

export function RootLayout() {
  const { data: cart } = useCart()
>>>>>>> react-query-exercise

  return (
    <div>
      <header className="bg-slate-600 text-white px-4 py-4 flex justify-between items-center">
        <Link to="/">My Shop</Link>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white" />
          <div className="w-px bg-white/30 h-6" />
          <Link to="/cart" className="flex items-center gap-1">
            <span className="text-sm w-6 h-6 bg-slate-200 flex items-center justify-center rounded-full text-slate-800">
<<<<<<< HEAD
              {cartAmount}
=======
              {cart?.length}
>>>>>>> react-query-exercise
            </span>
            <GiShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </header>
      <main className="p-4">
        {/* This is a placeholder - the element of the current route gets mounted here */}
        <Outlet />
      </main>
    </div>
  );
}
