import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">System Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Visitors" value="128" subtitle="Registered visitors" icon="👥" />
        <Card title="Active Passes" value="14" subtitle="Valid today" icon="🎫" color="bg-emerald-50 border-emerald-200" />
        <Card title="Checked-in" value="6" subtitle="Currently on campus" icon="🚪" color="bg-amber-50 border-amber-200" />
        <Card title="Blacklisted" value="2" subtitle="Restricted entries" icon="🚫" color="bg-rose-50 border-rose-200" />
      </div>
    </div>
  );
}
