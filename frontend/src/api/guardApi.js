import axiosInstance from './axios';

export const guardApi = {
    verifyPass: async (token, entryPoint = 'Main Gate') => {
        const response = await axiosInstance.post('/guard/verify', { token, entryPoint });
        return response.data;
    },

    checkIn: async (token, entryPoint = 'Main Gate') => {
        const response = await axiosInstance.post('/guard/check-in', { token, entryPoint });
        return response.data;
    },

    checkOut: async (token, entryPoint = 'Main Gate') => {
        const response = await axiosInstance.post('/guard/check-out', { token, entryPoint });
        return response.data;
    },

    getActiveVisitors: async () => {
        const response = await axiosInstance.get('/guard/active-visitors');
        return response.data;
    }
};
