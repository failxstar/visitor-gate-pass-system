import { useState, useEffect } from 'react';
import { Activity, Search, RefreshCw, Calendar, Clock, LogIn, LogOut } from 'lucide-react';
import { entryLogApi } from '../api/entryLogApi';
import Loader from '../components/Loader';

const EntryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await entryLogApi.getAllLogs();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch entry logs', err);
      setError('Failed to load entry logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    log.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  if (loading && logs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="text-indigo-600 dark:text-indigo-400" />
            Entry & Exit Logs
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Historical record of all visitor movements across campus
          </p>
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search visitors, hosts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <button 
            onClick={fetchLogs}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-300"
            title="Refresh logs"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-dark-900/50 border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-semibold">Visitor</th>
                <th className="px-6 py-4 font-semibold">Host / Purpose</th>
                <th className="px-6 py-4 font-semibold">Gate / Guard</th>
                <th className="px-6 py-4 font-semibold">Check-In</th>
                <th className="px-6 py-4 font-semibold">Check-Out</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    {searchTerm ? 'No logs found matching your search.' : 'No entry logs recorded yet.'}
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  let duration = '--';
                  if (log.checkInTime && log.checkOutTime) {
                    const diffMs = new Date(log.checkOutTime) - new Date(log.checkInTime);
                    const diffMins = Math.floor(diffMs / 60000);
                    const hours = Math.floor(diffMins / 60);
                    const mins = diffMins % 60;
                    duration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
                  } else if (log.checkInTime) {
                     duration = 'In Progress';
                  }

                  return (
                    <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">{log.visitorName}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{log.visitorPhone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 dark:text-gray-200">{log.hostName}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 max-w-[150px] truncate" title={log.purpose}>{log.purpose}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-900 dark:text-gray-200">
                          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
                          {log.entryPoint || 'Main Gate'}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 ml-3.5">
                          by {log.guardName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <LogIn size={14} className="text-green-500" />
                          <div>
                            <div className="text-gray-900 dark:text-gray-200">{formatTime(log.checkInTime)}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{formatDate(log.checkInTime)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {log.checkOutTime ? (
                          <div className="flex items-center gap-2">
                            <LogOut size={14} className="text-amber-500" />
                            <div>
                              <div className="text-gray-900 dark:text-gray-200">{formatTime(log.checkOutTime)}</div>
                              <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{formatDate(log.checkOutTime)}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                            Still inside
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
                          <Clock size={14} className="text-gray-400" />
                          {duration}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntryLogs;
