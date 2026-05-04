import type { Candidate, CandidateStage } from "../types/candidate";

export const pipelineStages: CandidateStage[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

export function groupCandidatesByStage(candidates: Candidate[]) {
  return pipelineStages.reduce(
    (acc, stage) => {
      acc[stage] = candidates.filter((candidate) => candidate.stage === stage);
      return acc;
    },
    {} as Record<CandidateStage, Candidate[]>,
  );
}