import React, {useState} from "react";
import { useCreatePurchase } from "../api/hooks";

export default function Purchases(){
  const create = useCreatePurchase();
  const [supplier, setSupplier] = useState("");
  const [variantId, setVariantId] = useState("");
  const [qty, setQty] = useState(0);

  const submit = () => {
    const payload = {
      supplierName: supplier,
      items: [{ productVariantId: parseInt(variantId), quantity: qty, buyPrice: 0 }]
    };
    create.mutate(payload, { onSuccess: () => { setSupplier(""); setVariantId(""); setQty(0); alert("Purchase recorded"); } });
  };

  return (
    <div className="max-w-md space-y-3">
      <input value={supplier} onChange={e=>setSupplier(e.target.value)} className="p-2 border rounded w-full" placeholder="Supplier" />
      <input value={variantId} onChange={e=>setVariantId(e.target.value)} className="p-2 border rounded w-full" placeholder="Variant ID" />
      <input type="number" value={qty} onChange={e=>setQty(+e.target.value)} className="p-2 border rounded w-full" placeholder="Quantity" />
      <div className="flex gap-2">
        <button onClick={submit} className="px-4 py-2 bg-black text-white rounded">Record Purchase</button>
      </div>
    </div>
  );
}
