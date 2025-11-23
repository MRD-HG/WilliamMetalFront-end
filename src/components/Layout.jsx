import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-72 bg-white border-r h-screen sticky top-0">
    <div className="p-4 font-bold text-xl">William Metal</div>
    <nav className="p-2 space-y-1 text-sm">
      <NavLink to="/dashboard" className={({isActive})=> isActive ? "block p-2 rounded bg-black text-white" : "block p-2 rounded hover:bg-gray-50"}>Dashboard</NavLink>
      <NavLink to="/products" className={({isActive})=> isActive ? "block p-2 rounded bg-black text-white" : "block p-2 rounded hover:bg-gray-50"}>Products</NavLink>
      <NavLink to="/variants" className={({isActive})=> isActive ? "block p-2 rounded bg-black text-white" : "block p-2 rounded hover:bg-gray-50"}>Variants</NavLink>
      <NavLink to="/purchases" className={({isActive})=> isActive ? "block p-2 rounded bg-black text-white" : "block p-2 rounded hover:bg-gray-50"}>Purchases</NavLink>
      <NavLink to="/invoices" className={({isActive})=> isActive ? "block p-2 rounded bg-black text-white" : "block p-2 rounded hover:bg-gray-50"}>Invoices</NavLink>
      <NavLink to="/stock" className={({isActive})=> isActive ? "block p-2 rounded bg-black text-white" : "block p-2 rounded hover:bg-gray-50"}>Stock</NavLink>
    </nav>
  </aside>
);

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <header className="h-14 flex items-center justify-between px-6 bg-white border-b">
          <div className="text-sm text-gray-600">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            <input placeholder="Search..." className="px-3 py-1 border rounded bg-gray-50" />
            <div className="text-sm text-gray-500">admin</div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
