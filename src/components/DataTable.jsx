export default function DataTable({ columns, data=[] }) {
  return (
    <div className="bg-white rounded shadow overflow-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(c => <th key={c.key} className="p-3 text-left text-sm">{c.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map(c => <td key={c.key} className="p-3 text-sm">{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
