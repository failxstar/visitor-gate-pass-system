import axiosInstance from './axiosConfig';

export const visitorApi = {
    getAllVisitors: async () => {
        const response = await axiosInstance.get('/api/visitors');
        return response.data;
    },

    getVisitorById: async (id) => {
        const response = await axiosInstance.get(`/api/visitors/${id}`);
        return response.data;
    },

    getVisitorByPhone: async (phone) => {
        const response = await axiosInstance.get(`/api/visitors/phone/${phone}`);
        return response.data;
    },

    // Public endpoint to register a new visitor
    createVisitorRequest: async (visitorData) => {
        const response = await axiosInstance.post('/api/visitors/request', visitorData);
        return response.data;
    }
};
