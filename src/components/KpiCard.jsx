export default function KpiCard({ title, value, delta, subtitle }) {
  const deltaClass = delta >= 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="flex items-baseline gap-4">
        <div className="text-2xl font-semibold">{value}</div>
        {delta !== undefined && <div className={`${deltaClass} text-sm`}>{delta >= 0 ? `+${delta}%` : `${delta}%`}</div>}
      </div>
      {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
    </div>
  );
}
