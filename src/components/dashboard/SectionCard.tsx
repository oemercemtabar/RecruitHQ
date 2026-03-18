import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function SectionCard({
  title,
  subtitle,
  action,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          ) : null}
        </div>

        {action ? <div>{action}</div> : null}
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}