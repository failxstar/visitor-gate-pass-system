export default function Card({ title, value, subtitle, icon, color = 'bg-indigo-50 border-indigo-200' }) {
  return (
    <div className={`p-5 rounded-xl border ${color} shadow-sm flex justify-between items-center`}>
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500">{title}</h4>
        <div className="text-2xl font-extrabold text-slate-800 mt-1">{value}</div>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {icon && <div className="text-3xl">{icon}</div>}
    </div>
  );
}
