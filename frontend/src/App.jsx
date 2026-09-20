import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import RootRedirect from './components/RootRedirect';
import AdminDashboard from './pages/AdminDashboard';
import GatePass from './pages/GatePass';
import HostDashboard from './pages/HostDashboard';

import VisitorRequest from './pages/VisitorRequest';
import DigitalPass from './pages/DigitalPass';
import GuardDashboard from './pages/GuardDashboard';
import Visitors from './pages/Visitors';
import EntryLogs from './pages/EntryLogs';
import Blacklist from './pages/Blacklist';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/visitor-request" element={<VisitorRequest />} />
          <Route path="/visitor/pass/:token" element={<DigitalPass />} />
          <Route path="/" element={<RootRedirect />} />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="passes" element={<GatePass />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="logs" element={<EntryLogs />} />
            <Route path="blacklist" element={<Blacklist />} />
          </Route>

          <Route path="/host" element={
            <ProtectedRoute allowedRoles={['HOST']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<HostDashboard />} />
          </Route>

          <Route path="/guard" element={
            <ProtectedRoute allowedRoles={['GUARD']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<GuardDashboard />} />
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
