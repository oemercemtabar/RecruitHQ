import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
      </div>

      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}