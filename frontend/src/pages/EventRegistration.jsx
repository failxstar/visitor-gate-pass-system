import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventApi } from '../api/eventApi';

const EventRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        participantName: '',
        participantEmail: '',
        participantPhone: ''
    });
    
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventApi.getEventById(id);
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event details:', err);
                setError('Failed to load event details. It may not exist.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');
        
        try {
            const response = await eventApi.registerForEvent({
                eventId: id,
                ...formData
            });
            // Redirect to digital pass page
            navigate(`/events/pass/${response.data.secureToken}`);
        } catch (err) {
            console.error('Registration error:', err);
            setSubmitError(err.response?.data?.message || 'Failed to register for event. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading event details...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white text-center">
                    <h1 className="text-2xl font-bold">Event Registration</h1>
                    <p className="mt-2 text-indigo-100">{event?.eventName}</p>
                </div>
                
                <div className="p-8">
                    <div className="mb-8 p-4 bg-indigo-50 rounded-lg text-indigo-900 text-sm">
                        <p><strong>Date:</strong> {new Date(event?.eventDate).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {event?.startTime} - {event?.endTime}</p>
                        <p><strong>Venue:</strong> {event?.venue}</p>
                    </div>
                    
                    {submitError && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                            {submitError}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="participantName"
                                value={formData.participantName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="John Doe"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="participantEmail"
                                value={formData.participantEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="john@example.com"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="participantPhone"
                                value={formData.participantPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="1234567890"
                            />
                        </div>
                        
                        <div className="pt-4 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => navigate('/events')}
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                ← Back to Events
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-indigo-600 text-white py-2 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors font-medium text-lg"
                            >
                                {submitting ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;
