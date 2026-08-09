import { createContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export default AuthContext;


// Lazily initialise from localStorage — avoids synchronous setState inside useEffect
const getInitialUser = () => {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  const name  = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  return token && role ? { token, role, name, email } : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(getInitialUser);
  const [loading] = useState(false);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, role, name, email: returnedEmail } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    localStorage.setItem('email', returnedEmail);
    setUser({ token, role, name, email: returnedEmail });
    return role;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
