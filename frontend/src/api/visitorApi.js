import axiosInstance from './axios';

export const visitorApi = {
    getAllVisitors: async () => {
        const response = await axiosInstance.get('/visitors');
        return response.data;
    },

    getVisitorById: async (id) => {
        const response = await axiosInstance.get(`/visitors/${id}`);
        return response.data;
    },

    getVisitorByPhone: async (phone) => {
        const response = await axiosInstance.get(`/visitors/phone/${phone}`);
        return response.data;
    },

    getHosts: async () => {
        const response = await axiosInstance.get('/visitors/hosts');
        return response.data;
    },

    // Public endpoint to register a new visitor
    createVisitorRequest: async (visitorData) => {
        const response = await axiosInstance.post('/visitors/request', visitorData);
        return response.data;
    }
};
