import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Eye } from "lucide-react";
import { candidates } from "../data/mock/candidates";
import { getScoreTextClass, getStageBadgeClasses } from "../lib/candidate-ui";
import type { CandidateStage } from "../types/candidate";
import { Link } from "react-router-dom";

const stageFilters: Array<"All" | CandidateStage> = [
  "All",
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

export function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [activeStage, setActiveStage] = useState<"All" | CandidateStage>("All");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesStage =
        activeStage === "All" ? true : candidate.stage === activeStage;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        query.length === 0
          ? true
          : [
              candidate.fullName,
              candidate.role,
              candidate.location,
              candidate.source,
              ...candidate.skills,
            ]
              .join(" ")
              .toLowerCase()
              .includes(query);

      return matchesStage && matchesSearch;
    });
  }, [search, activeStage]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Candidates
          </h2>
          <p className="mt-2 text-slate-600">
            Search, review, and track applicants across the hiring pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
            Add Candidate
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, role, source, location, or skill..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {stageFilters.map((stage) => {
              const isActive = activeStage === stage;

              return (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className={[
                    "rounded-full px-3.5 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                  ].join(" ")}
                >
                  {stage}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Candidate directory
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {filteredCandidates.length} candidate
              {filteredCandidates.length === 1 ? "" : "s"} found
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Newest
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Candidate
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stage
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Score
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Source
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updated
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50/80"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                        {candidate.fullName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {candidate.fullName}
                        </p>
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {candidate.role} · {candidate.yearsExperience} yrs exp
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStageBadgeClasses(
                        candidate.stage,
                      )}`}
                    >
                      {candidate.stage}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`text-sm font-semibold ${getScoreTextClass(
                        candidate.score,
                      )}`}
                    >
                      {candidate.score}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {candidate.source}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {candidate.location}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {candidate.updatedAt}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/candidates/${candidate.id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center">
                    <div className="mx-auto max-w-md">
                      <h4 className="text-base font-semibold text-slate-900">
                        No candidates found
                      </h4>
                      <p className="mt-2 text-sm text-slate-500">
                        Try changing the search term or selecting a different
                        stage filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}