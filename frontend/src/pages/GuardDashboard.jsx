import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { guardApi } from '../api/guardApi';
import { QrCode, Search, CheckCircle, XCircle, LogOut, Clock, ShieldAlert } from 'lucide-react';
import Loader from '../components/Loader';

const GuardDashboard = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [tokenInput, setTokenInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const fetchActiveVisitors = async () => {
    try {
      setLoading(true);
      const data = await guardApi.getActiveVisitors();
      setActiveVisitors(data);
    } catch (error) {
      console.error('Failed to fetch active visitors', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (tokenToVerify) => {
    try {
      setLoading(true);
      const data = await guardApi.verifyPass(tokenToVerify);
      setVerificationResult({ ...data, token: tokenToVerify });
    } catch (error) {
      setVerificationResult({
        valid: false,
        message: error.response?.data?.message || 'Verification failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'scan' && scannerEnabled) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      });

      scanner.render(
        (decodedText) => {
          scanner.clear();
          setScannerEnabled(false);
          handleVerify(decodedText);
        },
        () => {
          // Ignore scanning errors as they happen every frame it can't find a QR
        }
      );

      return () => {
        scanner.clear().catch(err => {
          console.error('Failed to clear scanner', err);
        });
      };
    }
  }, [activeTab, scannerEnabled]);



  const handleManualVerify = (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    handleVerify(tokenInput.trim());
    setTokenInput('');
  };

  const handleCheckIn = async (token) => {
    try {
      setLoading(true);
      await guardApi.checkIn(token);
      setVerificationResult(null);
      alert('Check-in recorded successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (token) => {
    try {
      setLoading(true);
      await guardApi.checkOut(token);
      setVerificationResult(null);
      if (activeTab === 'active') {
        fetchActiveVisitors();
      } else {
        alert('Check-out recorded successfully!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Console</h2>
      </div>

      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => { setActiveTab('scan'); setVerificationResult(null); }}
          className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'scan' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Scan & Verify
        </button>
        <button
          onClick={() => { 
            setActiveTab('active'); 
            setVerificationResult(null); 
            setScannerEnabled(false);
            fetchActiveVisitors();
          }}
          className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'active' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Active Visitors ({activeTab === 'active' ? activeVisitors.length : '...'})
        </button>
      </div>

      {activeTab === 'scan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <QrCode size={20} />
              QR Scanner
            </h3>
            
            {!scannerEnabled ? (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-dark-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                <QrCode size={48} className="text-gray-400 mb-4" />
                <button
                  onClick={() => setScannerEnabled(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Start Camera
                </button>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden bg-black relative">
                <div id="reader" className="w-full"></div>
                <button
                  onClick={() => setScannerEnabled(false)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                >
                  Stop
                </button>
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                <span className="text-sm font-medium text-gray-500">OR</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
              </div>

              <form onSubmit={handleManualVerify} className="flex gap-3">
                <div className="relative flex-1">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter Token manually"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!tokenInput.trim() || loading}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Verification Result</h3>
            
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader />
              </div>
            ) : verificationResult ? (
              <div className={`rounded-xl border ${verificationResult.valid ? 'border-green-200 bg-green-50 dark:bg-green-500/10 dark:border-green-500/20' : 'border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/20'}`}>
                <div className="p-6 border-b border-inherit">
                  <div className="flex items-start gap-4">
                    {verificationResult.valid ? (
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mt-1" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mt-1" />
                    )}
                    <div>
                      <h4 className={`text-xl font-bold ${verificationResult.valid ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                        {verificationResult.message}
                      </h4>
                      {verificationResult.gatePassId && (
                        <p className={`mt-1 text-sm ${verificationResult.valid ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          Pass ID: #{verificationResult.gatePassId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {verificationResult.gatePassId && (
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Visitor Name</p>
                        <p className="text-gray-900 dark:text-white font-semibold">{verificationResult.visitorName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Visitor Phone</p>
                        <p className="text-gray-900 dark:text-white font-semibold">{verificationResult.visitorPhone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Host Name</p>
                        <p className="text-gray-900 dark:text-white font-semibold">{verificationResult.hostName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Purpose</p>
                        <p className="text-gray-900 dark:text-white font-semibold">{verificationResult.purpose}</p>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      {verificationResult.valid && !verificationResult.alreadyCheckedIn && (
                        <button
                          onClick={() => handleCheckIn(verificationResult.token)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
                        >
                          <CheckCircle size={20} />
                          Check-In Visitor
                        </button>
                      )}
                      
                      {verificationResult.alreadyCheckedIn && (
                        <button
                          onClick={() => handleCheckOut(verificationResult.token)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
                        >
                          <LogOut size={20} />
                          Check-Out Visitor
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <ShieldAlert size={48} className="mb-4 text-gray-300 dark:text-gray-700" />
                <p>Scan a QR code or enter token to verify.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'active' && (
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-12"><Loader /></div>
          ) : activeVisitors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-dark-900/50">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Visitor</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Host</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in Time</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {activeVisitors.map((visitor) => (
                    <tr key={visitor.entryLogId} className="hover:bg-gray-50 dark:hover:bg-dark-700/30">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{visitor.visitorName}</p>
                        <p className="text-xs text-gray-500">{visitor.visitorPhone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {visitor.hostName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock size={16} />
                          {new Date(visitor.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleCheckOut(visitor.secureToken)}
                          className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Check Out
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Clock size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p>No active visitors currently checked in.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuardDashboard;
