import { Check, X, Users, Calendar } from 'lucide-react';

const HostDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-500" />
              Pending Approvals
            </h3>
            <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
              2 Pending
            </span>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-gray-700 gap-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Visitor Name {i}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Purpose: Meeting</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Expected: Today, 2:00 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg text-sm font-medium transition-colors">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Upcoming Visitors
            </h3>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="text-xs font-bold uppercase">Oct</span>
                  <span className="text-sm font-bold">{20 + i}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Upcoming Visitor {i}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM - 11:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
