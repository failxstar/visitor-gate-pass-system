import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { eventApi } from '../api/eventApi';

const EventPass = () => {
    const { token } = useParams();
    const [passData, setPassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const passRef = useRef(null);

    useEffect(() => {
        const fetchPassDetails = async () => {
            try {
                const response = await eventApi.getEventPass(token);
                setPassData(response.data);
            } catch (err) {
                console.error('Error fetching event pass:', err);
                setError('Invalid or expired pass link.');
            } finally {
                setLoading(false);
            }
        };

        fetchPassDetails();
    }, [token]);

    const downloadPass = () => {
        // Implementation for downloading pass if needed
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md flex items-center space-x-3">
                    <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-700">Loading your Event Pass...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Pass Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View Upcoming Events
                    </Link>
                </div>
            </div>
        );
    }

    const { 
        eventName, 
        participantName, 
        participantEmail,
        participantPhone,
        status, 
        secureToken 
    } = passData;
    
    // Auto-approve, but just in case
    const isApproved = status === 'APPROVED' || status === 'CHECKED_IN';

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            
            <div className="max-w-md w-full space-y-8 print:w-full print:max-w-none print:shadow-none" ref={passRef}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    
                    {/* Header */}
                    <div className={`px-6 py-8 text-center text-white ${
                        isApproved ? 'bg-indigo-600' : 
                        status === 'REJECTED' ? 'bg-red-600' : 'bg-yellow-500'
                    }`}>
                        <h1 className="text-3xl font-bold tracking-tight">EVENT PASS</h1>
                        <p className="mt-2 text-indigo-100 text-lg font-medium">{eventName}</p>
                    </div>

                    {/* QR Code Section */}
                    {isApproved ? (
                        <div className="px-6 py-8 bg-gray-50 flex flex-col items-center border-b border-gray-200">
                            <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-200">
                                <QRCodeSVG 
                                    value={secureToken} 
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <p className="mt-4 text-sm text-gray-500 font-mono tracking-widest">{secureToken.substring(0, 8).toUpperCase()}</p>
                            <p className="mt-2 text-sm text-indigo-600 font-medium text-center">
                                Present this QR code to the security guard at the event entrance
                            </p>
                        </div>
                    ) : (
                        <div className="px-6 py-12 bg-gray-50 flex flex-col items-center border-b border-gray-200">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 
                                ${status === 'REJECTED' ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-500'}">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {status === 'REJECTED' 
                                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    }
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 text-center">
                                Status: {status}
                            </h3>
                            <p className="mt-2 text-center text-gray-600">
                                QR code is only available for approved registrations.
                            </p>
                        </div>
                    )}

                    {/* Details Section */}
                    <div className="px-6 py-6 space-y-4">
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Participant Name</span>
                            <span className="font-semibold text-gray-900">{participantName}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Email</span>
                            <span className="font-semibold text-gray-900">{participantEmail}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Phone</span>
                            <span className="font-semibold text-gray-900">{participantPhone}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="text-gray-500 font-medium">Pass Status</span>
                            <span className={`font-bold ${
                                status === 'APPROVED' ? 'text-indigo-600' : 
                                status === 'CHECKED_IN' ? 'text-green-600' :
                                status === 'CHECKED_OUT' ? 'text-gray-600' :
                                'text-yellow-600'
                            }`}>
                                {status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 print:hidden">
                    <button 
                        onClick={downloadPass}
                        className="flex-1 bg-white text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex justify-center items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Print Pass
                    </button>
                    <Link 
                        to="/events"
                        className="flex-1 bg-indigo-600 text-white font-medium py-3 px-4 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex justify-center items-center text-center"
                    >
                        More Events
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default EventPass;
