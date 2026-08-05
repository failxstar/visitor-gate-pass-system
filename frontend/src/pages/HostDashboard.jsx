import { useState, useEffect, useContext } from 'react';
import { Check, X, Users, Calendar } from 'lucide-react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { format } from 'date-fns';

const HostDashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.name) return;
      try {
        const response = await api.get(`/visitors/host/${encodeURIComponent(user.name)}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching host requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
    // Poll every 5 seconds for real-time updates
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [user?.name]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/visitors/request/${id}/status`, null, { params: { status } });
      // Update local state immediately for responsiveness
      setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'PENDING');
  const upcomingRequests = requests.filter(req => req.status === 'APPROVED');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-500" />
              Pending Approvals
            </h3>
            {pendingRequests.length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {pendingRequests.length} Pending
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {loading && pendingRequests.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading requests...</p>
            ) : pendingRequests.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No pending requests.</p>
            ) : (
              pendingRequests.map((req) => (
                <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-gray-700 gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{req.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Purpose: {req.purpose}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Expected: {req.visitDate ? format(new Date(req.visitDate), 'MMM dd, yyyy') : 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(req.id, 'APPROVED')}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(req.id, 'REJECTED')}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg text-sm font-medium transition-colors">
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
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
            {loading && upcomingRequests.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading requests...</p>
            ) : upcomingRequests.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming visitors.</p>
            ) : (
              upcomingRequests.map((req) => (
                <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 min-w-12">
                    <span className="text-xs font-bold uppercase">
                      {req.visitDate ? format(new Date(req.visitDate), 'MMM') : '-'}
                    </span>
                    <span className="text-sm font-bold">
                      {req.visitDate ? format(new Date(req.visitDate), 'dd') : '-'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{req.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone: {req.phone}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
