import type { InterviewStatus } from "../types/interview";

export function getInterviewStatusClasses(status: InterviewStatus) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";
    case "Completed":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    case "Rescheduled":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "Cancelled":
      return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }
}