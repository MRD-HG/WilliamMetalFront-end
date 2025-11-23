import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Variants from "./pages/Variants";
import Purchases from "./pages/Purchases";
import Invoices from "./pages/Invoices";
import Stock from "./pages/Stock";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="variants" element={<Variants />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="stock" element={<Stock />} />
      </Route>
    </Routes>
  );
}
