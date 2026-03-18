import { SectionCard } from "../components/dashboard/SectionCard";
import { StatCard } from "../components/dashboard/StatCard";
import {
  dashboardStats,
  openRoles,
  recentActivity,
  upcomingInterviews,
} from "../data/mock/dashboard";

function getStatusClasses(status: string) {
  switch (status) {
    case "Urgent":
      return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
    case "Active":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    case "Reviewing":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Overview of hiring activity, roles, interviews, and funnel metrics.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard
            title="Open roles"
            subtitle="Track the highest-priority positions across departments."
          >
            <div className="space-y-4">
              {openRoles.map((role) => (
                <div
                  key={role.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {role.title}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          role.status,
                        )}`}
                      >
                        {role.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {role.department} · {role.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-8 text-sm">
                    <div>
                      <p className="text-slate-400 dark:text-slate-500">
                        Applicants
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {role.applicants}
                      </p>
                    </div>

                    <button className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                      View role
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard
            title="Upcoming interviews"
            subtitle="Next scheduled interviews for your team."
          >
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {interview.candidate}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {interview.role}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {interview.stage}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <p>{interview.time}</p>
                    <p>Interviewer: {interview.interviewer}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard
            title="Recent activity"
            subtitle="Latest changes happening across the hiring pipeline."
          >
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-white" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard
            title="Hiring health"
            subtitle="Quick snapshot of current funnel health."
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Average time to hire
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  21 days
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Top source
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  LinkedIn
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pipeline bottleneck
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Technical Interview
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}