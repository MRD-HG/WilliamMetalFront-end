// src/pages/Dashboard.jsx
import React from "react";
import {
  useDashboardMetrics,
  useSalesChart,
  useInvoices
} from "../api/hooks";
import KpiCard from "../components/KpiCard";
import DataTable from "../components/DataTable";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: salesData, isLoading: salesLoading } = useSalesChart();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();

  // fallback placeholders when backend endpoints do not exist
  const kpis = metrics || {
    todaySales: 0,
    monthSales: 0,
    lowStockCount: 0,
    stockValue: 0,
    lowStockList: []
  };

  const chartData = salesData || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Today Sales" value={kpis.todaySales} delta={5} subtitle="Revenue today" />
        <KpiCard title="Month Sales" value={kpis.monthSales} delta={8} subtitle="Revenue this month" />
        <KpiCard title="Low Stock" value={kpis.lowStockCount} delta={-2} subtitle="Items below threshold" />
        <KpiCard title="Stock Value" value={kpis.stockValue} delta={3} subtitle="Estimated value" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <div className="font-semibold mb-2">Sales (last 30 days)</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0f1724" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="font-semibold mb-2">Low Stock Items</div>
          <div style={{ maxHeight: 240 }} className="overflow-auto">
            <ul className="space-y-2">
              {(kpis.lowStockList || []).map(item => (
                <li key={item.id} className="flex justify-between">
                  <div>{item.sizeLabel}</div>
                  <div className="text-sm text-red-600">{item.stockQty}</div>
                </li>
              ))}
              {(!kpis.lowStockList || kpis.lowStockList.length === 0) && <li className="text-sm text-gray-400">No low stock items</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="font-semibold mb-2">Latest Invoices</div>
        {invoicesLoading ? <div>Loading...</div> : <InvoicesList invoices={invoices || []} />}
      </div>
    </div>
  );
}

function InvoicesList({ invoices }) {
  const rows = invoices || [];
  const cols = [
    { key: "id", title: "ID" },
    { key: "invoiceNo", title: "No" },
    { key: "date", title: "Date", render: r => new Date(r.date).toLocaleString() },
    { key: "totalAmount", title: "Total" },
    { key: "paymentStatus", title: "Status" },
  ];
  return <DataTable columns={cols} data={rows} />;
}
