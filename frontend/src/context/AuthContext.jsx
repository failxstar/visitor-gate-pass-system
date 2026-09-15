/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default AuthContext;


// Lazily initialise from localStorage — avoids synchronous setState inside useEffect
const getInitialUser = () => {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  const name  = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const id    = localStorage.getItem('id');
  return token && role ? { token, role, name, email, id: id ? parseInt(id, 10) : null } : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(getInitialUser);
  const [loading] = useState(false);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, role, name, email: returnedEmail, id } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    localStorage.setItem('email', returnedEmail);
    if (id) localStorage.setItem('id', id);
    setUser({ token, role, name, email: returnedEmail, id });
    return role;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
