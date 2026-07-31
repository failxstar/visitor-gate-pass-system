export default function Blacklist() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Blacklisted Visitors</h1>
        <button className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition">
          + Blacklist Visitor
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Visitor</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Flagged By</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-medium text-slate-900">Unknown Suspicious Person</td>
              <td className="p-4 text-rose-600">Security Policy Violation</td>
              <td className="p-4">System Admin</td>
              <td className="p-4">2026-07-31</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
