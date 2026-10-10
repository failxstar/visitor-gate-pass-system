import axiosInstance from './axios';

export const blacklistApi = {
    getAll: async () => {
        const response = await axiosInstance.get('/admin/blacklist');
        return response.data;
    },
    
    add: async (visitorPhone, reason) => {
        const response = await axiosInstance.post('/admin/blacklist', { visitorPhone, reason });
        return response.data;
    },
    
    remove: async (id) => {
        const response = await axiosInstance.delete(`/admin/blacklist/${id}`);
        return response.data;
    }
};
