type StatCardProps = {
  label: string;
  value: string;
  change: string;
  changeType?: "positive" | "neutral" | "negative";
};

export function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
}: StatCardProps) {
  const changeClass =
    changeType === "positive"
      ? "text-emerald-600"
      : changeType === "negative"
        ? "text-rose-600"
        : "text-slate-500 dark:text-slate-400";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <h3 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>
        <span className={`text-sm font-medium ${changeClass}`}>{change}</span>
      </div>
    </div>
  );
}