import api from './axiosConfig';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);

export const getVisitors = () => api.get('/visitors');
export const createVisitor = (data) => api.post('/visitors', data);

export const getGatePasses = () => api.get('/passes');
export const createGatePass = (passData) => api.post('/passes', passData);
export const updatePassStatus = (id, status) => api.put(`/passes/${id}/status?status=${status}`);

export const getEntryLogs = () => api.get('/entries');
export const checkInVisitor = (passId, entryPoint, guardId) =>
  api.post(`/entries/check-in?gatePassId=${passId}&entryPoint=${entryPoint}&guardId=${guardId}`);
export const checkOutVisitor = (logId) => api.put(`/entries/check-out/${logId}`);

export const getBlacklist = () => api.get('/blacklist');
export const blacklistVisitor = (visitorId, reason, adminId) =>
  api.post(`/blacklist?visitorId=${visitorId}&reason=${reason}&adminId=${adminId}`);
