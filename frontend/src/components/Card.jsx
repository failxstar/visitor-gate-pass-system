import clsx from 'clsx';

const Card = ({ title, value, icon: Icon, trend, colorClass = 'text-indigo-600 dark:text-indigo-400', bgClass = 'bg-indigo-50 dark:bg-indigo-500/10' }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          
          {trend && (
            <p className={clsx("text-sm font-medium mt-2 flex items-center gap-1", trend.isPositive ? "text-emerald-500" : "text-red-500")}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">vs last month</span>
            </p>
          )}
        </div>
        <div className={clsx("p-3 rounded-xl", bgClass, colorClass)}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default Card;
