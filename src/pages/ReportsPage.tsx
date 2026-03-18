import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { ReportCard } from "../components/reports/ReportCard";
import {
  departmentHiringData,
  hiringFunnelData,
  hiringVelocityData,
  reportStats,
  sourcePerformanceData,
} from "../data/mock/reports";
import { PageHeader } from "../components/shared/PageHeader";

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Track hiring performance, funnel progression, and recruiting efficiency."
        actions={
          <>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Last 30 days
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Export report
            </button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-slate-500">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ReportCard
          title="Hiring funnel"
          subtitle="Candidate progression across the recruiting pipeline."
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiringFunnelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ReportCard>

        <ReportCard
          title="Hiring velocity"
          subtitle="Average time to hire trend over recent months."
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringVelocityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="days"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ReportCard>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ReportCard
          title="Source performance"
          subtitle="Candidate volume and hires by source."
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Source
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Candidates
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Hired
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody>
                {sourcePerformanceData.map((row) => {
                  const conversion =
                    row.candidates > 0
                      ? ((row.hired / row.candidates) * 100).toFixed(1)
                      : "0.0";

                  return (
                    <tr key={row.source} className="border-t border-slate-100">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        {row.source}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {row.candidates}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {row.hired}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {conversion}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ReportCard>

        <ReportCard
          title="Department hiring status"
          subtitle="Role demand and active pipeline across teams."
        >
          <div className="space-y-4">
            {departmentHiringData.map((department) => (
              <div
                key={department.department}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {department.department}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {department.openRoles} open roles · {department.activeCandidates} active candidates
                    </p>
                  </div>

                  <div className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                    {department.hires} hires
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ReportCard>
      </section>
    </div>
  );
}