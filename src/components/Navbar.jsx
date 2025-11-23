import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({isActive}) => 
  "px-3 py-2 rounded-md text-sm font-medium " + (isActive ? "bg-black text-white" : "text-wmGray hover:bg-gray-100");

export default function Navbar(){
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="font-semibold text-lg">William Metal</div>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/variants" className={linkClass}>Variants</NavLink>
            <NavLink to="/purchases" className={linkClass}>Purchases</NavLink>
            <NavLink to="/invoices" className={linkClass}>Invoices</NavLink>
            <NavLink to="/stock" className={linkClass}>Stock</NavLink>
          </div>
          <div className="text-sm text-wmGray">admin</div>
        </div>
      </div>
    </nav>
  );
}
