import { BriefcaseBusiness, Building2, Plus, Users } from "lucide-react";
import { jobs } from "../data/mock/jobs";
import { getJobStatusClasses, getWorkModeClasses } from "../lib/Job-ui";
import { PageHeader } from "../components/shared/PageHeader";

export function JobsPage() {
  const activeRoles = jobs.filter((job) => job.status === "Active").length;
  const urgentRoles = jobs.filter((job) => job.status === "Urgent").length;
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + job.applicantsCount,
    0,
  );
  const totalOpenings = jobs.reduce((sum, job) => sum + job.openings, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PageHeader
          title="Jobs"
          description="Manage open roles, monitor hiring demand, and track applicant volume."
          actions={
            <>
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Filter roles
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
                <Plus className="h-4 w-4" />
                Create role
              </button>
            </>
          }
        />
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Open roles</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {jobs.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active roles</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {activeRoles}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Urgent roles</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {urgentRoles}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total applicants</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {totalApplicants}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Open roles</h3>
            <p className="mt-1 text-sm text-slate-500">
              {totalOpenings} total openings across departments
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="space-y-4">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-900">
                        {job.title}
                      </h4>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getJobStatusClasses(
                          job.status,
                        )}`}
                      >
                        {job.status}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getWorkModeClasses(
                          job.workMode,
                        )}`}
                      >
                        {job.workMode}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        <span>
                          {job.department} · {job.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
                        <span>{job.openings} opening(s)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span>{job.applicantsCount} applicants</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Manager:</span>
                        <span>{job.hiringManager}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <span className="text-sm text-slate-400">
                      Updated {job.updatedAt}
                    </span>
                    <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                      View role
                    </button>
                    <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                      Review applicants
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}