import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Wallet,
  Clock3,
} from "lucide-react";
import { candidates } from "../data/mock/candidates";
import {
  candidateNotes,
  candidateScorecards,
  candidateTimeline,
} from "../data/mock/candidateProfile";
import { getScoreTextClass, getStageBadgeClasses } from "../lib/candidate-ui";

export function CandidateProfilePage() {
  const { candidateId } = useParams();

  const candidate = candidates.find((item) => item.id === candidateId);

  if (!candidate) {
    return (
      <div className="space-y-4">
        <Link
          to="/candidates"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to candidates
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Candidate not found
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            The candidate you are looking for does not exist in the current mock
            dataset.
          </p>
        </div>
      </div>
    );
  }

  const initials = candidate.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link
          to="/candidates"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to candidates
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white dark:bg-white dark:text-slate-900">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {candidate.fullName}
                  </h1>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStageBadgeClasses(
                      candidate.stage,
                    )}`}
                  >
                    {candidate.stage}
                  </span>
                </div>

                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                  {candidate.role} · {candidate.yearsExperience} years experience
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:min-w-360px">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Candidate score</p>
                <p
                  className={`mt-2 text-3xl font-semibold ${getScoreTextClass(
                    candidate.score,
                  )}`}
                >
                  {candidate.score}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Source</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {candidate.source}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Panel title="Profile summary">
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{candidate.summary}</p>
          </Panel>

          <Panel title="Interview timeline">
            <div className="mt-5 space-y-4">
              {candidateTimeline.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="mt-2 h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-white" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Scorecards">
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {candidateScorecards.map((scorecard) => (
                <div
                  key={scorecard.id}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {scorecard.category}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Reviewer: {scorecard.reviewer}
                      </p>
                    </div>

                    <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white">
                      {scorecard.score}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {scorecard.summary}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Notes">
            <div className="mt-5 space-y-4">
              {candidateNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {note.title}
                    </p>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {note.timestamp}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {note.body}
                  </p>

                  <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {note.author}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Contact">
            <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{candidate.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{candidate.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{candidate.location}</span>
              </div>
            </div>
          </Panel>

          <Panel title="Details">
            <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <DetailRow icon={<Building2 className="h-4 w-4 text-slate-400 dark:text-slate-500" />} label="Current company" value={candidate.currentCompany} />
              <DetailRow icon={<Wallet className="h-4 w-4 text-slate-400 dark:text-slate-500" />} label="Salary expectation" value={candidate.salaryExpectation} />
              <DetailRow icon={<Clock3 className="h-4 w-4 text-slate-400 dark:text-slate-500" />} label="Availability" value={candidate.availability} />
            </div>
          </Panel>

          <Panel title="Actions">
            <div className="mt-5 space-y-3">
              <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                Schedule interview
              </button>
              <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                Move to next stage
              </button>
              <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                Download resume
              </button>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      {children}
    </section>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-1 font-medium text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}