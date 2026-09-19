import axiosInstance from './axiosConfig';

export const eventApi = {
    // Public endpoints
    getActiveEvents: () => axiosInstance.get('/events'),
    getEventById: (id) => axiosInstance.get(`/events/${id}`),
    registerForEvent: (data) => axiosInstance.post('/events/register', data),
    getEventPass: (token) => axiosInstance.get(`/events/pass/${token}`),
    
    // Admin endpoints
    getAllEvents: () => axiosInstance.get('/events/all'),
    createEvent: (data) => axiosInstance.post('/events', data),
    updateEvent: (id, data) => axiosInstance.put(`/events/${id}`, data),
    deleteEvent: (id) => axiosInstance.delete(`/events/${id}`),
    getEventRegistrations: (eventId) => axiosInstance.get(`/events/${eventId}/registrations`),
};
