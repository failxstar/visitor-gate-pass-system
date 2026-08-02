import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import GuardDashboard from './pages/GuardDashboard';
import HostDashboard from './pages/HostDashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<Layout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Other admin routes can be added here */}
            </Route>
          </Route>

          {/* Guard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['GUARD']} />}>
            <Route element={<Layout />}>
              <Route path="/guard" element={<GuardDashboard />} />
              {/* Other guard routes can be added here */}
            </Route>
          </Route>

          {/* Host Routes */}
          <Route element={<ProtectedRoute allowedRoles={['HOST']} />}>
            <Route element={<Layout />}>
              <Route path="/host" element={<HostDashboard />} />
              {/* Other host routes can be added here */}
            </Route>
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
