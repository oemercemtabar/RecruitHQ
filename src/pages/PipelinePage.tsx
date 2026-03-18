import { candidates } from "../data/mock/candidates";
import { PipelineColumn } from "../components/pipeline/PipelineColumn";
import { groupCandidatesByStage, pipelineStages } from "../lib/pipeline";
import { PageHeader } from "../components/shared/PageHeader";
import { Plus } from "lucide-react";

export function PipelinePage() {
  const grouped = groupCandidatesByStage(candidates);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        description="Track candidates across each stage of the hiring process."
        actions={
          <>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Filter by role
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Create stage view
            </button>
          </>
        }
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total candidates
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {candidates.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              In interview
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {grouped.Interview.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Offers sent
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {grouped.Offer.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Hired
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {grouped.Hired.length}
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-x-auto pb-2">
        <div className="grid min-w-1400px grid-cols-6 gap-4">
          {pipelineStages.map((stage) => (
            <PipelineColumn
              key={stage}
              stage={stage}
              candidates={grouped[stage]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}