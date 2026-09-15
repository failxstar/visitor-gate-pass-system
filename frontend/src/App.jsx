import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import RootRedirect from './components/RootRedirect';
import AdminDashboard from './pages/AdminDashboard';
import GatePass from './pages/GatePass';
import HostDashboard from './pages/HostDashboard';
import MouseEffect from './components/MouseEffect';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MouseEffect />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RootRedirect />} />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="passes" element={<GatePass />} />
          </Route>

          <Route path="/host" element={
            <ProtectedRoute allowedRoles={['HOST']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<HostDashboard />} />
          </Route>
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
              <h1 className="text-2xl font-bold">Unauthorized Access</h1>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
