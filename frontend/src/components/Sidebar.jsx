import { NavLink } from 'react-router-dom';
import { LogOut, Home, Users, FileText, Settings, UserCheck, Activity, KeyRound, ShieldAlert, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getLinks = () => {
    switch (user?.role) {
      case 'ADMIN':
        return [
          { name: 'Dashboard', path: '/admin', icon: Home },
          { name: 'Visitors', path: '/admin/visitors', icon: Users },
          { name: 'Gate Passes', path: '/admin/passes', icon: FileText },
          { name: 'Guards', path: '/admin/guards', icon: ShieldAlert },
          { name: 'Blacklist', path: '/admin/blacklist', icon: UserCheck },
          { name: 'Settings', path: '/admin/settings', icon: Settings },
        ];
      case 'GUARD':
        return [
          { name: 'Dashboard', path: '/guard', icon: Home },
          { name: 'Scan Pass', path: '/guard/scan', icon: Activity },
          { name: 'Verify Visitor', path: '/guard/verify', icon: UserCheck },
          { name: 'Entry Logs', path: '/guard/logs', icon: History },
        ];
      case 'HOST':
        return [
          { name: 'Dashboard', path: '/host', icon: Home },
          { name: 'Approvals', path: '/host/approvals', icon: KeyRound },
          { name: 'Upcoming', path: '/host/upcoming', icon: Users },
          { name: 'History', path: '/host/history', icon: History },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">GatePass</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                  isActive 
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                )
              }
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 w-full transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
