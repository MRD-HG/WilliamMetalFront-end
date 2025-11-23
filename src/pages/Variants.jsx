import React from "react";
import { useVariants } from "../api/hooks";
import DataTable from "../components/DataTable";

export default function Variants(){
  const { data } = useVariants();
  const rows = data || [];
  const cols = [
    { key: "id", title: "ID" },
    { key: "sizeLabel", title: "Size" },
    { key: "stockQty", title: "Stock" },
    { key: "buyPrice", title: "Buy" },
    { key: "salePrice", title: "Sale" },
  ];
  return (
    <div>
      <h1 className="text-2xl mb-4">Variants</h1>
      <DataTable columns={cols} data={rows} />
    </div>
  );
}
