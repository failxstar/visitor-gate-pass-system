import { createContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export default AuthContext;


// Lazily initialise from localStorage — avoids synchronous setState inside useEffect
const getInitialUser = () => {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  return token && role ? { token, role } : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(getInitialUser);
  const [loading] = useState(false); // always false with lazy init — setter not needed

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role });
    return role;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
