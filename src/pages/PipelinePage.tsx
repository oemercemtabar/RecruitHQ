import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Candidate, CandidateStage } from "../types/candidate";
import { candidates as initialCandidates } from "../data/mock/candidates";
import { PipelineColumn } from "../components/pipeline/PipelineColumn";
import { PipelineCandidateCard } from "../components/pipeline/PipelineCandidateCard";
import { pipelineStages } from "../lib/pipeline";
import { PageHeader } from "../components/shared/PageHeader";

const STORAGE_KEY = "recruithq-pipeline-candidates";

function groupCandidatesByStage(candidates: Candidate[]) {
  return pipelineStages.reduce(
    (acc, stage) => {
      acc[stage] = candidates.filter((candidate) => candidate.stage === stage);
      return acc;
    },
    {} as Record<CandidateStage, Candidate[]>,
  );
}

function findCandidateStage(
  allCandidates: Candidate[],
  candidateId: string,
): CandidateStage | null {
  const found = allCandidates.find((candidate) => candidate.id === candidateId);
  return found?.stage ?? null;
}

export function PipelinePage() {
  const [pipelineCandidates, setPipelineCandidates] = useState<Candidate[]>(() => {
    if (typeof window === "undefined") return initialCandidates;

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) return initialCandidates;

    try {
      return JSON.parse(saved) as Candidate[];
    } catch {
      return initialCandidates;
    }
  });

  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pipelineCandidates));
  }, [pipelineCandidates]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const grouped = useMemo(
    () => groupCandidatesByStage(pipelineCandidates),
    [pipelineCandidates],
  );

  function handleDragStart(event: DragStartEvent) {
    const activeId = String(event.active.id);
    const found =
      pipelineCandidates.find((candidate) => candidate.id === activeId) ?? null;

    setActiveCandidate(found);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveCandidate(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeStage = findCandidateStage(pipelineCandidates, activeId);
    if (!activeStage) return;

    const overCandidateStage = findCandidateStage(pipelineCandidates, overId);
    const targetStage = overCandidateStage ?? (overId as CandidateStage);

    if (!targetStage) return;

    if (activeStage === targetStage) {
      const stageCandidates = grouped[activeStage];
      const oldIndex = stageCandidates.findIndex(
        (candidate) => candidate.id === activeId,
      );
      const newIndex = stageCandidates.findIndex(
        (candidate) => candidate.id === overId,
      );

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const reorderedStageCandidates = arrayMove(
        stageCandidates,
        oldIndex,
        newIndex,
      );

      const otherCandidates = pipelineCandidates.filter(
        (candidate) => candidate.stage !== activeStage,
      );

      setPipelineCandidates([...otherCandidates, ...reorderedStageCandidates]);
      return;
    }

    setPipelineCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === activeId
          ? { ...candidate, stage: targetStage }
          : candidate,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        description="Track candidates across each stage of the hiring process."
        actions={
          <>
            <button
              onClick={() => setPipelineCandidates(initialCandidates)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Reset board
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              Filter by role
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              Create stage view
            </button>
          </>
        }
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Total candidates
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              {pipelineCandidates.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              In interview
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              {grouped.Interview.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Offers sent
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              {grouped.Offer.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Hired
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              {grouped.Hired.length}
            </p>
          </div>
        </div>
      </section>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <section className="overflow-x-auto pb-2">
          <div className="grid auto-cols-280px grid-flow-col gap-4">
            {pipelineStages.map((stage) => (
              <PipelineColumn
                key={stage}
                stage={stage}
                candidates={grouped[stage]}
              />
            ))}
          </div>
        </section>

        <DragOverlay>
          {activeCandidate ? (
            <div className="w-[320px]">
              <PipelineCandidateCard candidate={activeCandidate} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}