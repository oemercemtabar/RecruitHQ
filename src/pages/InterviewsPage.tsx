import { interviews } from "../data/mock/interviews";
import { InterviewGroupCard } from "../components/interviews/InterviewGroupCard";
import { PageHeader } from "../components/shared/PageHeader";

export function InterviewsPage() {
  const today = interviews.filter((item) => item.dateLabel === "Today");
  const tomorrow = interviews.filter((item) => item.dateLabel === "Tomorrow");
  const thisWeek = interviews.filter((item) => item.dateLabel === "This Week");

  const scheduledCount = interviews.filter(
    (item) => item.status === "Scheduled",
  ).length;

  const completedCount = interviews.filter(
    (item) => item.status === "Completed",
  ).length;

  const rescheduledCount = interviews.filter(
    (item) => item.status === "Rescheduled",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interviews"
        description="Manage upcoming interview schedules and track candidate progress."
        actions={
          <>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Filter calendar
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Schedule interview
            </button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total interviews</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {interviews.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Scheduled</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {scheduledCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {completedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Rescheduled</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {rescheduledCount}
          </p>
        </div>
      </section>

      <div className="space-y-6">
        <InterviewGroupCard title="Today" items={today} />
        <InterviewGroupCard title="Tomorrow" items={tomorrow} />
        <InterviewGroupCard title="This Week" items={thisWeek} />
      </div>
    </div>
  );
}