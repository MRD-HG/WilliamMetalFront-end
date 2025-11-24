export default function DataTable({ columns = [], data = [] }) {
  if (!Array.isArray(data)) {
    // try to find the array inside a common shape
    if (data?.data && Array.isArray(data.data)) data = data.data;
    else return <div>No data</div>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr>{columns.map(c => <th key={c.key}>{c.title}</th>)}</tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id || row.Id}>
            {columns.map(c => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
