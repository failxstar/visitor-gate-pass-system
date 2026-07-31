export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'visitors', label: 'Visitors', icon: '👥' },
    { id: 'passes', label: 'Gate Passes', icon: '🎫' },
    { id: 'entries', label: 'Entry Logs', icon: '📝' },
    { id: 'blacklist', label: 'Blacklist', icon: '🚫' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col space-y-2">
      <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-3 py-2">
        Main Navigation
      </div>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === item.id
              ? 'bg-indigo-600 text-white shadow'
              : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </aside>
  );
}
