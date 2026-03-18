import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const routeMeta: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of hiring activity, roles, interviews, and funnel metrics.",
  },
  "/jobs": {
    title: "Jobs",
    subtitle: "Manage open roles, monitor hiring demand, and track applicant volume.",
  },
  "/candidates": {
    title: "Candidates",
    subtitle: "Search, review, and track applicants across the hiring pipeline.",
  },
  "/pipeline": {
    title: "Pipeline",
    subtitle: "Track candidates across each stage of the hiring process.",
  },
  "/interviews": {
    title: "Interviews",
    subtitle: "Manage upcoming interview schedules and track candidate progress.",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Track hiring performance, funnel progression, and recruiting efficiency.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Configure workspace preferences, hiring process defaults, and team notifications.",
  },
};

export function Topbar() {
  const location = useLocation();

  const isCandidateProfile = location.pathname.startsWith("/candidates/");
  const meta = isCandidateProfile
    ? {
        title: "Candidate Profile",
        subtitle: "Review candidate details, notes, scorecards, and interview progress.",
      }
    : routeMeta[location.pathname] ?? {
        title: "RecruitHQ",
        subtitle: "Hiring operations workspace",
      };

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">{meta.title}</h1>
          <p className="text-sm text-slate-500">{meta.subtitle}</p>
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