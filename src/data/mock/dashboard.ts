export const dashboardStats = [
  {
    label: "Open Roles",
    value: "18",
    change: "+3 this month",
    changeType: "positive" as const,
  },
  {
    label: "Active Candidates",
    value: "246",
    change: "+12.4%",
    changeType: "positive" as const,
  },
  {
    label: "Interviews This Week",
    value: "34",
    change: "+6 scheduled",
    changeType: "positive" as const,
  },
  {
    label: "Offer Acceptance Rate",
    value: "82%",
    change: "-2% vs last month",
    changeType: "negative" as const,
  },
];

export const openRoles = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Milan, Italy",
    applicants: 42,
    status: "Urgent",
  },
  {
    id: "job-2",
    title: "Product Designer",
    department: "Design",
    location: "Remote - Europe",
    applicants: 27,
    status: "Active",
  },
  {
    id: "job-3",
    title: "Talent Acquisition Partner",
    department: "People",
    location: "Rome, Italy",
    applicants: 19,
    status: "Active",
  },
  {
    id: "job-4",
    title: "Data Analyst",
    department: "Operations",
    location: "Hybrid - Turin",
    applicants: 31,
    status: "Reviewing",
  },
];

export const upcomingInterviews = [
  {
    id: "int-1",
    candidate: "Giulia Moretti",
    role: "Senior Frontend Engineer",
    time: "Today · 14:30",
    stage: "Technical Interview",
    interviewer: "Marco R.",
  },
  {
    id: "int-2",
    candidate: "Luca Bianchi",
    role: "Product Designer",
    time: "Today · 16:00",
    stage: "Portfolio Review",
    interviewer: "Elena T.",
  },
  {
    id: "int-3",
    candidate: "Sofia Conti",
    role: "Talent Acquisition Partner",
    time: "Tomorrow · 10:00",
    stage: "Hiring Manager",
    interviewer: "Davide P.",
  },
];

export const recentActivity = [
  {
    id: "act-1",
    title: "Francesca Russo moved to Interview",
    meta: "Senior Frontend Engineer · 12 min ago",
  },
  {
    id: "act-2",
    title: "New application received from Matteo Ricci",
    meta: "Data Analyst · 34 min ago",
  },
  {
    id: "act-3",
    title: "Offer sent to Alessia Greco",
    meta: "Product Designer · 1 hour ago",
  },
  {
    id: "act-4",
    title: "Paolo Serra rejected after screening",
    meta: "Talent Acquisition Partner · 2 hours ago",
  },
];