import axiosInstance from './axios';

export const gatePassApi = {
    getAllGatePasses: async () => {
        const response = await axiosInstance.get('/passes');
        return response.data;
    },

    getGatePassById: async (id) => {
        const response = await axiosInstance.get(`/passes/${id}`);
        return response.data;
    },

    getGatePassesByHostId: async (hostId) => {
        const response = await axiosInstance.get(`/passes/host/${hostId}`);
        return response.data;
    },

    getGatePassesByVisitorId: async (visitorId) => {
        const response = await axiosInstance.get(`/passes/visitor/${visitorId}`);
        return response.data;
    },

    createGatePass: async (passData) => {
        const response = await axiosInstance.post('/passes', passData);
        return response.data;
    },

    updatePassStatus: async (id, status) => {
        const response = await axiosInstance.put(`/passes/${id}/status`, { status });
        return response.data;
    },

    trackPass: async (token) => {
        const response = await axiosInstance.get(`/passes/track/${token}`);
        return response.data;
    }
};
