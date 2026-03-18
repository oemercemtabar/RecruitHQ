export type JobStatus = "Active" | "Urgent" | "Reviewing" | "Paused" | "Closed";

export type WorkMode = "On-site" | "Hybrid" | "Remote";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  workMode: WorkMode;
  status: JobStatus;
  openings: number;
  applicantsCount: number;
  hiringManager: string;
  updatedAt: string;
};