import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { DashboardPage } from "../../pages/DashboardPage";
import { CandidatesPage } from "../../pages/CandidatesPage";
import { PipelinePage } from "../../pages/PipelinePage";
import { JobsPage } from "../../pages/JobsPage";
import { InterviewsPage } from "../../pages/InterviewsPage";
import { ReportsPage } from "../../pages/ReportsPage";
import { SettingsPage } from "../../pages/SettingsPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "candidates", element: <CandidatesPage /> },
      { path: "pipeline", element: <PipelinePage /> },
      { path: "interviews", element: <InterviewsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);