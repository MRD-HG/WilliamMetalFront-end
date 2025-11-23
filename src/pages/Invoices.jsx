import React, {useState} from "react";
import { useCreateInvoice, useInvoices } from "../api/hooks";
import DataTable from "../components/DataTable";

export default function Invoices(){
  const { data } = useInvoices();
  const invoices = data || [];
  const create = useCreateInvoice();
  const [clientId, setClientId] = useState(1);
  const [variantId, setVariantId] = useState(0);
  const [qty, setQty] = useState(1);

  const submit = () => {
    const payload = { clientId, createdBy: 1, items: [{ productVariantId: variantId, quantity: qty, unitPrice: 0 }]};
    create.mutate(payload, { onSuccess: () => { alert("Invoice created"); } });
  };

  const cols = [
    { key: "id", title: "ID" },
    { key: "invoiceNo", title: "No" },
    { key: "date", title: "Date", render: r => new Date(r.date).toLocaleString() },
    { key: "totalAmount", title: "Total" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 max-w-2xl">
        <input type="number" value={clientId} onChange={e=>setClientId(+e.target.value)} className="p-2 border rounded" placeholder="Client ID" />
        <input type="number" value={variantId} onChange={e=>setVariantId(+e.target.value)} className="p-2 border rounded" placeholder="Variant ID" />
        <input type="number" value={qty} onChange={e=>setQty(+e.target.value)} className="p-2 border rounded" placeholder="Quantity" />
        <button onClick={submit} className="px-4 py-2 bg-black text-white rounded">Create Invoice</button>
      </div>

      <div>
        <DataTable columns={cols} data={invoices} />
      </div>
    </div>
  );
}
