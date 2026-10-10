import axiosInstance from './axios';

export const entryLogApi = {
    getAllLogs: async (limit) => {
        const url = limit ? `/entry-logs?limit=${limit}` : '/entry-logs';
        const response = await axiosInstance.get(url);
        return response.data;
    }
};
