import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Visitors from './pages/Visitors';
import GatePass from './pages/GatePass';
import EntryLogs from './pages/EntryLogs';
import Blacklist from './pages/Blacklist';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'visitors' && <Visitors />}
          {activeTab === 'passes' && <GatePass />}
          {activeTab === 'entries' && <EntryLogs />}
          {activeTab === 'blacklist' && <Blacklist />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </AuthProvider>
  );
}
