export type CandidateStage =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Hired"
  | "Rejected";

export type CandidateSource =
  | "LinkedIn"
  | "Referral"
  | "Careers Page"
  | "Dribbble"
  | "Indeed";

export type Candidate = {
  id: string;
  fullName: string;
  role: string;
  stage: CandidateStage;
  score: number;
  source: CandidateSource;
  location: string;
  updatedAt: string;
  yearsExperience: number;
  skills: string[];
  email: string;
  phone: string;
  summary: string;
  currentCompany: string;
  salaryExpectation: string;
  availability: string;
};