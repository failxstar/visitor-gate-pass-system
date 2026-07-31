export default function Visitors() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Visitor Directory</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
          + Add Visitor
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">ID Proof</th>
              <th className="p-4">Registered Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-medium text-slate-900">Alice Smith</td>
              <td className="p-4">9876543210</td>
              <td className="p-4">Aadhar-1234-5678</td>
              <td className="p-4">2026-07-31</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">Bob Johnson</td>
              <td className="p-4">9123456789</td>
              <td className="p-4">PAN-ABCDE1234F</td>
              <td className="p-4">2026-07-31</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
