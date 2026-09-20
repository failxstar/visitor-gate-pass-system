import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Activity, ShieldAlert, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Staff Management', path: '/admin/users', icon: Users },
    { name: 'Visitors', path: '/admin/visitors', icon: Users },
    { name: 'Gate Passes', path: '/admin/passes', icon: FileText },
    { name: 'Entry Logs', path: '/admin/logs', icon: Activity },
    { name: 'Blacklist', path: '/admin/blacklist', icon: ShieldAlert },
  ];

  const hostNavItems = [
    { name: 'Dashboard', path: '/host', icon: LayoutDashboard },
  ];

  const guardNavItems = [
    { name: 'Security Console', path: '/guard', icon: ShieldAlert },
  ];

  let navItems = [];
  if (user?.role === 'ADMIN') navItems = adminNavItems;
  else if (user?.role === 'HOST') navItems = hostNavItems;
  else if (user?.role === 'GUARD') navItems = guardNavItems;

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full transition-colors duration-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <ShieldAlert size={28} />
          <span className="text-xl font-bold text-gray-900 dark:text-white">GateGuard</span>
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin' || item.path === '/host' || item.path === '/guard'}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
              isActive 
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700/50 hover:text-gray-900 dark:hover:text-white'
            )}
          >
            <item.icon size={20} className="transition-transform group-hover:scale-110" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-4 px-4">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Admin User'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'admin@college.edu'}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors duration-200 font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
