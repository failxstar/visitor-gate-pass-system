import useAuth from '../context/useAuth';


export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold tracking-wide">Campus GatePass System</span>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-indigo-800 px-3 py-1 rounded-full">
            {user.name} ({user.role})
          </span>
          <button
            onClick={logout}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
