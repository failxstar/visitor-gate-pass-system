import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventApi } from '../api/eventApi';

const EventsPage = () => {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventApi.getActiveEvents();
            setEvents(response.data);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load upcoming events.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading events...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming College Events</h1>
            
            {events && events.length === 0 ? (
                <div className="text-center text-gray-500 bg-white p-12 rounded-lg shadow">
                    <p className="text-lg">No upcoming events found.</p>
                    <p className="mt-2">Check back later for exciting college events!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events && events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                            <div className="bg-indigo-600 text-white p-4">
                                <h2 className="text-xl font-semibold truncate">{event.eventName}</h2>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                                    
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <div className="flex items-center">
                                            <span className="font-semibold w-24">Date:</span>
                                            <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-24">Time:</span>
                                            <span>{event.startTime} - {event.endTime}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-24">Venue:</span>
                                            <span className="truncate">{event.venue}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-24">Organizer:</span>
                                            <span className="truncate">{event.organizer}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => navigate(`/events/${event.id}/register`)}
                                    className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsPage;
