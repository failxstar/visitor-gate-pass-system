import { QrCode, CheckCircle, Clock } from 'lucide-react';

const GuardDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-500 text-white rounded-2xl p-6 shadow-lg shadow-primary-500/30 flex flex-col items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors">
          <QrCode className="w-12 h-12 mb-3" />
          <h3 className="text-xl font-bold">Scan Gate Pass</h3>
          <p className="text-primary-100 text-sm mt-1">Scan QR code for quick entry</p>
        </div>
        
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
          <CheckCircle className="w-12 h-12 mb-3 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verify Visitor</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manual entry verification</p>
        </div>
        
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
          <Clock className="w-12 h-12 mb-3 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Entry Logs</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View today's entries</p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Entries (Today)</h3>
          <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Visitor #{1024 + i}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Entry authorized at 09:{15 + i} AM</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gate A</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuardDashboard;
