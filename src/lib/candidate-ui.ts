import type { CandidateStage } from "../types/candidate";

export function getStageBadgeClasses(stage: CandidateStage) {
  switch (stage) {
    case "Applied":
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
    case "Screening":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "Interview":
      return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";
    case "Offer":
      return "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200";
    case "Hired":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    case "Rejected":
      return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function getScoreTextClass(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 75) return "text-slate-900";
  return "text-amber-600";
}