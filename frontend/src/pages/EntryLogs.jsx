import React from 'react';
import { Activity } from 'lucide-react';

const EntryLogs = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 max-w-md w-full">
        <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Activity size={40} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Entry Logs</h2>
        <p className="text-gray-500 dark:text-gray-400">
          The full entry and exit history view is scheduled for the next development phase. For now, you can view the active status of gate passes on the Admin Dashboard.
        </p>
      </div>
    </div>
  );
};

export default EntryLogs;
