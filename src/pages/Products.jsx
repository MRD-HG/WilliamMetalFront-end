import React, { useState } from "react";
import { useProducts, useCreateProduct, useDeleteProduct } from "../api/hooks";
import DataTable from "../components/DataTable";

export default function Products() {
  const { data } = useProducts();
  const products = data || [];
  const create = useCreateProduct();
  const remove = useDeleteProduct();
  const [name, setName] = useState("");

  const cols = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "actions", title: "Actions", render: (r) => <button className="text-red-600" onClick={()=>remove.mutate(r.id)}>Delete</button> }
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" placeholder="New product name"/>
        <button className="px-4 py-2 bg-black text-white rounded" onClick={()=>create.mutate({ name, purchasePrice:0, salePrice:0 })}>Add</button>
      </div>
      <DataTable columns={cols} data={products} />
    </div>
  );
}
