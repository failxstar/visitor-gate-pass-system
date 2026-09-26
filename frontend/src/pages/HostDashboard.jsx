import { useState, useEffect, useCallback } from 'react';
import { gatePassApi } from '../api/gatePassApi';
import { useAuth } from '../context/AuthContext';

function HostDashboard() {
    const { user } = useAuth();
    const [passes, setPasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyPasses = useCallback(async () => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        try {
            const data = await gatePassApi.getGatePassesByHostId(user.id);
            setPasses(data);
        } catch (error) {
            console.error("Failed to fetch passes", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        let cancelled = false;

        const loadPasses = async () => {
            if (!user?.id) {
                if (!cancelled) {
                    setLoading(false);
                }
                return;
            }

            try {
                const data = await gatePassApi.getGatePassesByHostId(user.id);
                if (!cancelled) {
                    setPasses(data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch passes", error);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadPasses();

        return () => {
            cancelled = true;
        };
    }, [user]);

    const handleStatusChange = async (id, status) => {
        try {
            await gatePassApi.updatePassStatus(id, status);
            fetchMyPasses();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (loading) return <div>Loading dashboard...</div>;

    const pendingPasses = passes.filter(p => p.status === 'PENDING');
    const historyPasses = passes.filter(p => p.status !== 'PENDING');

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-gray-600 mb-8">Manage your visitor gate pass requests here.</p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Pending Requests ({pendingPasses.length})</h2>
                {pendingPasses.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow text-gray-500 text-center">
                        You have no pending visitor requests.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingPasses.map(pass => (
                            <div key={pass.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">{pass.visitorName}</h3>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">PENDING</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2"><strong>Purpose:</strong> {pass.purpose}</p>
                                <p className="text-sm text-gray-600 mb-4"><strong>Date:</strong> {new Date(pass.validFrom).toLocaleDateString()}</p>
                                
                                <div className="flex space-x-3 mt-4">
                                    <button 
                                        onClick={() => handleStatusChange(pass.id, 'APPROVED')}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleStatusChange(pass.id, 'REJECTED')}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">History</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visitor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {historyPasses.map(pass => (
                                    <tr key={pass.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.visitorName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{pass.purpose}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(pass.validFrom).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${pass.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                                                  pass.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                                                  'bg-gray-100 text-gray-800'}`}>
                                                {pass.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {historyPasses.length === 0 && (
                        <div className="p-6 text-center text-gray-500">No past requests found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HostDashboard;
