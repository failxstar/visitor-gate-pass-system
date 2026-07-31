export default function GatePass() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Gate Pass Requests</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
          + Request Pass
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Pass ID</th>
              <th className="p-4">Visitor</th>
              <th className="p-4">Host</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-mono text-xs">#PASS-101</td>
              <td className="p-4 font-medium text-slate-900">Alice Smith</td>
              <td className="p-4">Prof. John Host</td>
              <td className="p-4">Project Discussion</td>
              <td className="p-4">
                <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">PENDING</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
