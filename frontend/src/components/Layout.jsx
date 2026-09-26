import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleMenuOpen = () => {
    setIsSidebarOpen(true);
  };

  

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between lg:justify-end px-4 sm:px-8 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-dark-800/50 backdrop-blur-md z-10 relative">
          
          <button
            onClick={handleMenuOpen}
            className="p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700 lg:hidden"
            aria-label="Open menu"
            type="button"
          >
            <Menu size={24} />
          </button>

          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-400"
            aria-label="Toggle dark mode"
            type="button"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-dark-900 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;