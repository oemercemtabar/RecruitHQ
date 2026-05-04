export type InterviewStatus =
  | "Scheduled"
  | "Completed"
  | "Rescheduled"
  | "Cancelled";

export type InterviewStage =
  | "Recruiter Screening"
  | "Hiring Manager"
  | "Technical Interview"
  | "Portfolio Review"
  | "Final Interview";

export type Interview = {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  stage: InterviewStage;
  dateLabel: "Today" | "Tomorrow" | "This Week";
  time: string;
  interviewer: string;
  status: InterviewStatus;
  location: string;
};