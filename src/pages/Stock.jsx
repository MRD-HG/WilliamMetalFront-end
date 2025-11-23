import React from "react";
import { useStock, useAdjustStock } from "../api/hooks";

export default function Stock(){
  const { data } = useStock();
  const rows = data || [];
  const adjust = useAdjustStock();

  const doAdjust = async (variantId, amount) => {
    await adjust.mutate({ productVariantId: variantId, quantity: amount, reason: "Manual adjustment", createdBy: 1 });
    alert("Adjusted");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Stock</h1>
      <div className="grid grid-cols-1 gap-3">
        {rows.map(v => (
          <div key={v.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{v.sizeLabel}</div>
              <div className="text-sm text-gray-500">ID: {v.id}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-gray-400">Stock</div>
              <div className="font-semibold">{v.stockQty}</div>
              <div className="flex gap-2">
                <button onClick={() => doAdjust(v.id, 1)} className="px-2 py-1 border rounded">+1</button>
                <button onClick={() => doAdjust(v.id, -1)} className="px-2 py-1 border rounded">-1</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
