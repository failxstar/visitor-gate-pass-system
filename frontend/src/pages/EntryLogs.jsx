export default function EntryLogs() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Campus Entry & Exit Logs</h1>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Log ID</th>
              <th className="p-4">Pass ID</th>
              <th className="p-4">Check-in Time</th>
              <th className="p-4">Check-out Time</th>
              <th className="p-4">Gate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-mono text-xs">#LOG-501</td>
              <td className="p-4 font-mono text-xs">#PASS-101</td>
              <td className="p-4">2026-07-31 09:30 AM</td>
              <td className="p-4 text-slate-400">Still inside</td>
              <td className="p-4">Gate 1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
