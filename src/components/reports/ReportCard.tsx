import type { ReactNode } from "react";

type ReportCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function ReportCard({ title, subtitle, children }: ReportCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}