import { useState, useEffect } from 'react';
import { visitorApi } from '../api/visitorApi';
import { gatePassApi } from '../api/gatePassApi';

const VisitorRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idProofNumber: '',
    photoUrl: '',
    hostId: '',
    purpose: '',
    visitDate: '',
    startTime: '',
    endTime: ''
  });
  
  const [hosts, setHosts] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch available hosts
    const fetchHosts = async () => {
      try {
        const hostsData = await visitorApi.getHosts();
        setHosts(hostsData);
      } catch (error) {
        console.error("Failed to fetch hosts", error);
      }
    };
    fetchHosts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.startTime >= formData.endTime) {
      setStatus({ type: 'error', message: 'End time must be after start time.' });
      return;
    }

    const validToDate = new Date(`${formData.visitDate}T${formData.endTime}`);
    if (validToDate <= new Date()) {
      setStatus({ type: 'error', message: 'End time must be in the future.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      // 1. Register Visitor
      const visitorResponse = await visitorApi.createVisitorRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        idProofNumber: formData.idProofNumber,
        photoUrl: formData.photoUrl
      });
      
      const visitorId = visitorResponse.id;

      // 2. Create Gate Pass Request
      const passRequest = {
        visitorId: visitorId,
        hostId: parseInt(formData.hostId),
        purpose: formData.purpose,
        validFrom: `${formData.visitDate}T${formData.startTime}`,
        validTo: `${formData.visitDate}T${formData.endTime}`
      };
      
      const gatePassResponse = await gatePassApi.createGatePass(passRequest);

      setStatus({ 
        type: 'success', 
        message: 'Gate pass request submitted successfully! Waiting for host approval.',
        token: gatePassResponse.secureToken
      });
      setFormData({ 
        name: '', phone: '', email: '', idProofNumber: '', photoUrl: '', 
        hostId: '', purpose: '', visitDate: '', startTime: '', endTime: '' 
      });
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to submit request. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Request Gate Pass
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in your details and visit purpose.
          </p>
        </div>
        
        {status.message && (
          <div className={`p-4 rounded-md flex flex-col gap-2 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <span>{status.message}</span>
            {status.token && (
              <div className="mt-2 p-3 bg-white rounded border border-green-100 shadow-sm">
                <p className="text-sm font-semibold mb-1">Save this tracking link:</p>
                <a 
                  href={`/visitor/pass/${status.token}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline break-all text-sm font-mono"
                >
                  {window.location.origin}/visitor/pass/{status.token}
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  Bookmark this link to check your pass status. A QR code will be generated once approved.
                </p>
              </div>
            )}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Visitor Details */}
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Your Details</h3>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name" name="name" type="text" required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder="John Doe" value={formData.name} onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phone" name="phone" type="tel" required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder="+1234567890" value={formData.phone} onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email" name="email" type="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder="john@example.com" value={formData.email} onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="idProofNumber" className="block text-sm font-medium text-gray-700">ID Proof Number</label>
              <input
                id="idProofNumber" name="idProofNumber" type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Aadhar / Passport No" value={formData.idProofNumber} onChange={handleChange}
              />
            </div>

            {/* Visit Details */}
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mt-6">Visit Details</h3>

            <div>
              <label htmlFor="hostId" className="block text-sm font-medium text-gray-700">Select Host</label>
              <select
                id="hostId" name="hostId" required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1 bg-white"
                value={formData.hostId} onChange={handleChange}
              >
                <option value="" disabled>Select a host</option>
                {hosts.map(host => (
                  <option key={host.id} value={host.id}>{host.name} ({host.email})</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose of Visit</label>
              <input
                id="purpose" name="purpose" type="text" required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder="Meeting / Delivery" value={formData.purpose} onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700">Date of Visit</label>
                <input
                  id="visitDate" name="visitDate" type="date" required
                  min={new Date().toISOString().split('T')[0]}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                  value={formData.visitDate} onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">From Time</label>
                <input
                  id="startTime" name="startTime" type="time" required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                  value={formData.startTime} onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">To Time</label>
                <input
                  id="endTime" name="endTime" type="time" required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                  value={formData.endTime} onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
          
          <div className="text-center mt-4">
             <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
               Return to Login
             </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitorRequest;
