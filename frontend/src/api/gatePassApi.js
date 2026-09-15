import axiosInstance from './axiosConfig';

export const gatePassApi = {
    getAllGatePasses: async () => {
        const response = await axiosInstance.get('/api/passes');
        return response.data;
    },

    getGatePassById: async (id) => {
        const response = await axiosInstance.get(`/api/passes/${id}`);
        return response.data;
    },

    getGatePassesByHostId: async (hostId) => {
        const response = await axiosInstance.get(`/api/passes/host/${hostId}`);
        return response.data;
    },

    getGatePassesByVisitorId: async (visitorId) => {
        const response = await axiosInstance.get(`/api/passes/visitor/${visitorId}`);
        return response.data;
    },

    createGatePass: async (passData) => {
        const response = await axiosInstance.post('/api/passes', passData);
        return response.data;
    },

    updatePassStatus: async (id, status) => {
        const response = await axiosInstance.put(`/api/passes/${id}/status`, { status });
        return response.data;
    }
};
