import { Link } from "react-router-dom";
import { CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";
import type { Interview } from "../../types/interview";
import { getInterviewStatusClasses } from "../../lib/interview-ui";

type InterviewGroupCardProps = {
  title: string;
  items: Interview[];
};

export function InterviewGroupCard({
  title,
  items,
}: InterviewGroupCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {items.length}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {items.map((interview) => (
            <article
              key={interview.id}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/50"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {interview.candidateName}
                    </h4>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getInterviewStatusClasses(
                        interview.status,
                      )}`}
                    >
                      {interview.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {interview.role}
                  </p>

                  <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <span>{interview.stage}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <span>{interview.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <span>{interview.interviewer}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <span>{interview.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/candidates/${interview.candidateId}`}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View candidate
                  </Link>
                  <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                    Open details
                  </button>
                </div>
              </div>
            </article>
          ))}

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
              No interviews scheduled.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}