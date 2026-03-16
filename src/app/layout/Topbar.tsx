import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">RecruitHQ</h1>
          <p className="text-sm text-slate-500">
            Manage candidates, hiring pipelines, and interviews
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidates, jobs, interviews..."
              className="w-72 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            CT
          </div>
        </div>
      </div>
    </header>
  );
}