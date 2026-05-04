import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BriefcaseBusiness, GripVertical, MapPin, Star } from "lucide-react";
import type { Candidate } from "../../types/candidate";
import { getScoreTextClass, getStageBadgeClasses } from "../../lib/candidate-ui";

type PipelineCandidateCardProps = {
  candidate: Candidate;
};

export function PipelineCandidateCard({
  candidate,
}: PipelineCandidateCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: candidate.id,
    data: {
      type: "candidate",
      candidate,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={[
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600",
        isDragging ? "opacity-60 shadow-lg" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="mt-0.5 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
            {candidate.fullName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {candidate.fullName}
            </h4>
            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
              {candidate.yearsExperience} yrs experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Star className="h-3.5 w-3.5" />
          <span className={getScoreTextClass(candidate.score)}>
            {candidate.score}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span className="truncate">{candidate.role}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span className="truncate">{candidate.location}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.slice(0, 2).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStageBadgeClasses(
            candidate.stage,
          )}`}
        >
          {candidate.stage}
        </span>

        <Link
          to={`/candidates/${candidate.id}`}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}