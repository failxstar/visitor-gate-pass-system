import { useState, useEffect, useCallback } from 'react';
import { gatePassApi } from '../api/gatePassApi';

function GatePass() {
    const [passes, setPasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPasses = useCallback(async () => {
        try {
            const data = await gatePassApi.getAllGatePasses();
            setPasses(data);
        } catch (error) {
            console.error("Failed to fetch passes", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        const loadPasses = async () => {
            try {
                const data = await gatePassApi.getAllGatePasses();
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
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await gatePassApi.updatePassStatus(id, status);
            fetchPasses();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (loading) return <div>Loading gate passes...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gate Passes Management</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid From</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {passes.map((pass) => (
                                <tr key={pass.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{pass.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.visitorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.hostName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pass.purpose}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(pass.validFrom).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${pass.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                                              pass.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                                              pass.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' : 
                                              'bg-yellow-100 text-yellow-800'}`}>
                                            {pass.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        {pass.status === 'PENDING' && (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusChange(pass.id, 'APPROVED')}
                                                    className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusChange(pass.id, 'REJECTED')}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {pass.status === 'APPROVED' && (
                                            <button 
                                                onClick={() => handleStatusChange(pass.id, 'EXPIRED')}
                                                className="text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-1 rounded"
                                            >
                                                Expire
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {passes.length === 0 && (
                    <div className="p-6 text-center text-gray-500">No gate passes found.</div>
                )}
            </div>
        </div>
    );
}

export default GatePass;
