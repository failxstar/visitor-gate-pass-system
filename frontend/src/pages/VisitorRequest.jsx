import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, Mail, FileText, Calendar, Building, Send, RefreshCw, ArrowLeft } from 'lucide-react';

const VisitorRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    purpose: '',
    host: '',
    visitDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/visitors/hosts');
        setHosts(response.data);
      } catch (err) {
        console.error('Failed to fetch hosts:', err);
      }
    };
    fetchHosts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      purpose: '',
      host: '',
      visitDate: '',
    });
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.phone || !formData.email || !formData.host || !formData.visitDate || !formData.purpose) {
      setError('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8080/api/visitors/request', {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        host: formData.host,
        visitDate: formData.visitDate,
        purpose: formData.purpose
      });
      if (response.data.message === 'Request submitted successfully') {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="fixed -top-32 -right-24 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px] pointer-events-none" />
      <div className="fixed -bottom-32 -left-24 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px] pointer-events-none" />
      <div className="fixed top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-300/20 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-2xl glass rounded-3xl p-8 shadow-2xl relative z-10 border border-white/20">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center mb-4 shadow-lg overflow-hidden backdrop-blur-md">
            <img
              src="/college-logo.png"
              alt="College Logo"
              className="w-16 h-16 object-contain rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="text-4xl">🎓</span>';
              }}
            />
          </div>
          <h1 className="text-3xl font-extrabold text-white m-0 tracking-tight text-center">
            Visitor Pass Request
          </h1>
          <p className="text-white/70 text-sm mt-2 text-center">
            Please fill out the details below to request entry
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-8 text-center backdrop-blur-sm animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Request submitted successfully</h2>
            <p className="text-emerald-100 mb-6">
              Your visitor pass request has been sent to the host for approval. You will be notified once it is approved.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl shadow-lg shadow-indigo-500/30 transition-all font-semibold"
              >
                Submit Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200 text-sm backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-white/90 text-xs font-bold mb-1.5 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-white/90 text-xs font-bold mb-1.5 uppercase tracking-wide">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-white/90 text-xs font-bold mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-white/90 text-xs font-bold mb-1.5 uppercase tracking-wide">Visit Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>
            </div>

            {/* Host / Faculty */}
            <div>
              <label className="block text-white/90 text-xs font-bold mb-1.5 uppercase tracking-wide">Host / Faculty</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <select
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-900">Select a host</option>
                  {hosts.map(host => (
                    <option key={host} value={host} className="text-gray-900">{host}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose of Visit */}
            <div>
              <label className="block text-white/90 text-xs font-bold mb-1.5 uppercase tracking-wide">Purpose of Visit</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Please describe the reason for your visit..."
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <RefreshCw className="w-5 h-5" /> Reset Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 hover:from-orange-500 hover:via-red-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-[0_8px_24px_rgba(239,68,68,0.35)] hover:shadow-[0_12px_32px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VisitorRequest;
