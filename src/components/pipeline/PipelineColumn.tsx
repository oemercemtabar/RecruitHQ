import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { CandidateStage, Candidate } from "../../types/candidate";
import { PipelineCandidateCard } from "./PipelineCandidateCard";

type PipelineColumnProps = {
  stage: CandidateStage;
  candidates: Candidate[];
};

function getColumnAccent(stage: CandidateStage) {
  switch (stage) {
    case "Applied":
      return "bg-slate-500";
    case "Screening":
      return "bg-amber-500";
    case "Interview":
      return "bg-blue-500";
    case "Offer":
      return "bg-violet-500";
    case "Hired":
      return "bg-emerald-500";
    case "Rejected":
      return "bg-rose-500";
    default:
      return "bg-slate-400";
  }
}

export function PipelineColumn({
  stage,
  candidates,
}: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
    data: {
      type: "stage",
      stage,
    },
  });

  return (
    <section className="flex h-full min-h-[520px] flex-col rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${getColumnAccent(stage)}`} />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {stage}
            </h3>
          </div>

          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
            {candidates.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={[
          "flex-1 space-y-3 p-3 transition",
          isOver ? "rounded-b-2xl bg-slate-100 dark:bg-slate-800/70" : "",
        ].join(" ")}
      >
        <SortableContext
          items={candidates.map((candidate) => candidate.id)}
          strategy={verticalListSortingStrategy}
        >
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <PipelineCandidateCard
                key={candidate.id}
                candidate={candidate}
              />
            ))
          ) : (
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-4 text-center dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                No candidates in this stage
              </p>
            </div>
          )}
        </SortableContext>
      </div>
    </section>
  );
}