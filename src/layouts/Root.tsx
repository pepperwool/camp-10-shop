import { Outlet } from "react-router-dom"

export function RootLayout() {
  return (
    <div>
      <header className="bg-slate-600 text-white px-4 py-4 flex justify-between items-center">
        <h2>My Shop</h2>
        <div className="w-8 h-8 rounded-full bg-white" />
      </header>
      <main className="p-4">
        {/* This is a placeholder - the element of the current route gets mounted here */}
        <Outlet />
      </main>
    </div>
  )
}
