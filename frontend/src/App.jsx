import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            {/* Other admin routes will be nested here */}
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
