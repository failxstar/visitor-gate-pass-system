import { Users, FileText, ShieldAlert, UserCheck } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel }) => (
  <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-gray-500 dark:text-gray-400 ml-2">{trendLabel}</span>
      </div>
    )}
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Visitors" value="1,248" icon={Users} trend={12} trendLabel="vs last month" />
        <StatCard title="Total Gate Passes" value="984" icon={FileText} trend={8} trendLabel="vs last month" />
        <StatCard title="Total Guards" value="24" icon={ShieldAlert} />
        <StatCard title="Blacklisted" value="12" icon={UserCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Gate Passes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">ID</th>
                  <th className="px-4 py-3">Visitor Name</th>
                  <th className="px-4 py-3">Host</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-800">
                  <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">#GP-001</td>
                  <td className="px-4 py-4">John Doe</td>
                  <td className="px-4 py-4">Dr. Smith</td>
                  <td className="px-4 py-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Approved</span></td>
                  <td className="px-4 py-4">Today, 10:00 AM</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">#GP-002</td>
                  <td className="px-4 py-4">Jane Smith</td>
                  <td className="px-4 py-4">Prof. Johnson</td>
                  <td className="px-4 py-4"><span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span></td>
                  <td className="px-4 py-4">Today, 11:30 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors text-sm font-medium text-gray-900 dark:text-white">
              Add New Guard
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors text-sm font-medium text-gray-900 dark:text-white">
              Generate Report
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium text-red-600 dark:text-red-400">
              Update Blacklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
