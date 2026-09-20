import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gatePassApi } from '../api/gatePassApi';
import { QRCodeSVG } from 'qrcode.react';
import { Clock, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import Loader from '../components/Loader';

const DigitalPass = () => {
  const { token } = useParams();
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const data = await gatePassApi.trackPass(token);
        setPass(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid or expired tracking link.');
      } finally {
        setLoading(false);
      }
    };
    fetchPass();
  }, [token]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8">
          <ShieldAlert className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="text-blue-600 font-medium hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const renderStatus = () => {
    switch (pass.status) {
      case 'PENDING':
        return (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-bold">Pending Approval</p>
              <p className="text-sm">Your host ({pass.hostName}) has not approved this pass yet.</p>
            </div>
          </div>
        );
      case 'REJECTED':
        return (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-bold">Request Rejected</p>
              <p className="text-sm">Your host declined this visit request.</p>
            </div>
          </div>
        );
      case 'EXPIRED':
        return (
          <div className="bg-gray-100 text-gray-800 p-4 rounded-lg flex items-center gap-3">
            <Clock className="w-6 h-6 text-gray-600" />
            <div>
              <p className="font-bold">Pass Expired</p>
              <p className="text-sm">This gate pass is no longer valid.</p>
            </div>
          </div>
        );
      case 'APPROVED':
      case 'CHECKED_IN':
      case 'CHECKED_OUT':
        return (
          <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold">Approved</p>
              <p className="text-sm">Please show the QR code at the security gate.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-indigo-600 p-6 text-center text-white">
          <h1 className="text-2xl font-bold tracking-wider uppercase">Gate Pass</h1>
          <p className="text-indigo-200 mt-1">#{pass.id}</p>
        </div>

        <div className="p-6 space-y-6">
          {renderStatus()}

          {(pass.status === 'APPROVED' || pass.status === 'CHECKED_IN') && (
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
              <QRCodeSVG 
                value={token} 
                size={200}
                level="M"
                includeMargin={true}
                className="bg-white p-2 rounded shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-4 font-mono">{token}</p>
              {pass.status === 'CHECKED_IN' && (
                <span className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Currently Checked In
                </span>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Visitor</p>
                <p className="font-medium text-gray-900">{pass.visitorName}</p>
                <p className="text-sm text-gray-600">{pass.visitorPhone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Host</p>
                <p className="font-medium text-gray-900">{pass.hostName}</p>
                <p className="text-sm text-gray-600">{pass.hostEmail}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Purpose</p>
              <p className="font-medium text-gray-900">{pass.purpose}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Valid From</p>
                <p className="font-medium text-gray-900">
                  {new Date(pass.validFrom).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(pass.validFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Valid Until</p>
                <p className="font-medium text-gray-900">
                  {new Date(pass.validTo).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(pass.validTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-center border-t">
          <p className="text-xs text-gray-500">
            Powered by College GateGuard System
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalPass;
