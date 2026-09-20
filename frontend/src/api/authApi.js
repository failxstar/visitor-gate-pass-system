import axiosInstance from './axios';

export const authApi = {
    registerUser: async (userData) => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    }
};
