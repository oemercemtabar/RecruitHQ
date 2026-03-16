import { BriefcaseBusiness, MapPin, Star } from "lucide-react";
import type { Candidate } from "../../types/candidate";
import { getScoreTextClass, getStageBadgeClasses } from "../../lib/candidate-ui";
import { Link } from "react-router-dom";
type PipelineCandidateCardProps = {
  candidate: Candidate;
};

export function PipelineCandidateCard({
  candidate,
}: PipelineCandidateCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {candidate.fullName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-slate-900">
              {candidate.fullName}
            </h4>
            <p className="mt-1 truncate text-sm text-slate-500">
              {candidate.yearsExperience} yrs experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
          <Star className="h-3.5 w-3.5" />
          <span className={getScoreTextClass(candidate.score)}>
            {candidate.score}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
          <span className="truncate">{candidate.role}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="truncate">{candidate.location}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to={`/candidates/${candidate.id}`}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View Profile
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStageBadgeClasses(
            candidate.stage,
          )}`}
        >
          {candidate.stage}
        </span>

        <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
          View Profile
        </button>
      </div>
    </article>
  );
}