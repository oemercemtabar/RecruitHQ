import type { JobStatus, WorkMode } from "../types/job";

export function getJobStatusClasses(status: JobStatus) {
  switch (status) {
    case "Urgent":
      return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
    case "Active":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    case "Reviewing":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "Paused":
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
    case "Closed":
      return "bg-slate-200 text-slate-600 ring-1 ring-inset ring-slate-300";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }
}

export function getWorkModeClasses(mode: WorkMode) {
  switch (mode) {
    case "Remote":
      return "bg-blue-50 text-blue-700";
    case "Hybrid":
      return "bg-violet-50 text-violet-700";
    case "On-site":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}