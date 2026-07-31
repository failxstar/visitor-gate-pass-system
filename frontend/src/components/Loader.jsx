export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col justify-center items-center py-12 space-y-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p className="text-sm text-slate-500 font-medium">{text}</p>
    </div>
  );
}
