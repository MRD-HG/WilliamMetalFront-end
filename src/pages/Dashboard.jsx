import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDashboardMetrics, useSalesChart } from "../api/hooks.js";
import KpiCard from "../components/KpiCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DataTable from "../components/DataTable";
import api from "../api/axios";

export default function Dashboard() {
  // attempt to fetch server metrics (optional)
  const { data: metrics } = useQuery(["metrics"], () => api.get("/dashboard/metrics").then(r => r.data), { retry: false });
  const { data: sales } = useQuery(["salesChart"], () => api.get("/dashboard/sales-chart").then(r => r.data), { retry: false });

  const kpis = metrics || {
    todaySales: "0",
    monthSales: "0",
    lowStockCount: 0,
    stockValue: 0
  };

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
          <div style={{height: 240}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sales || []}>
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
              { (metrics?.lowStockList || []).map(item => (
                <li key={item.id} className="flex justify-between">
                  <div>{item.sizeLabel}</div>
                  <div className="text-sm text-red-600">{item.stockQty}</div>
                </li>
              )) }
              {(!metrics?.lowStockList || metrics.lowStockList.length===0) && <li className="text-sm text-gray-400">No low stock items</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="font-semibold mb-2">Latest Invoices</div>
        <InvoicesList />
      </div>
    </div>
  );
}

function InvoicesList() {
  const { data } = useQuery(["invoicesList"], () => api.get("/invoices").then(r => r.data));
  const rows = data || [];
  const cols = [
    { key: "id", title: "ID" },
    { key: "invoiceNo", title: "No" },
    { key: "date", title: "Date", render: r => new Date(r.date).toLocaleString() },
    { key: "totalAmount", title: "Total" },
    { key: "paymentStatus", title: "Status" },
  ];
  return <DataTable columns={cols} data={rows} />;
}
