import type { ReactNode } from "react";

type ReportCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function ReportCard({ title, subtitle, children }: ReportCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}