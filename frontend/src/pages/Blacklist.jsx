import { ShieldAlert } from 'lucide-react';

const Blacklist = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 max-w-md w-full">
        <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={40} className="text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Blacklisted Visitors</h2>
        <p className="text-gray-500 dark:text-gray-400">
          The visitor blacklisting feature will be implemented in the next major update.
        </p>
      </div>
    </div>
  );
};

export default Blacklist;
