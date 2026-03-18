import { useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Moon,
  Palette,
  Sun,
  Workflow,
} from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { useTheme } from "../hooks/useTheme";
import type { ThemeMode } from "../app/providers/ThemeProvider";

const defaultStages = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

export function SettingsPage() {
  const [stages] = useState(defaultStages);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure workspace preferences, hiring process defaults, and team notifications."
        actions={
          <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            Save changes
          </button>
        }
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Panel icon={<BriefcaseBusiness className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" />} title="Workspace" subtitle="Basic company and recruiting workspace settings.">
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input label="Workspace name" defaultValue="RecruitHQ" />
              <Input label="Default timezone" defaultValue="Europe/Rome" />
              <Input label="Careers page URL" defaultValue="careers.recruithq.io" />
              <Input label="Default recruiter" defaultValue="Claudia T." />
            </div>
          </Panel>

          <Panel icon={<Workflow className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" />} title="Hiring stages" subtitle="Define the default pipeline stages used across open roles.">
            <div className="mt-5 space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{stage}</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      Stage {index + 1}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                      Edit
                    </button>
                    <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<Bell className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" />} title="Notifications" subtitle="Control alerts and reminders for recruiting activity.">
            <div className="mt-5 space-y-4">
              <ToggleRow
                title="Email notifications"
                description="Receive updates about candidate movement and new applications."
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
              <ToggleRow
                title="Interview reminders"
                description="Get reminders before upcoming scheduled interviews."
                checked={interviewReminders}
                onChange={setInterviewReminders}
              />
              <ToggleRow
                title="Weekly reports"
                description="Receive a weekly recruiting performance summary."
                checked={weeklyReports}
                onChange={setWeeklyReports}
              />
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel icon={<Palette className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" />} title="Appearance" subtitle="Adjust the workspace display and visual preferences.">
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Theme
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["light", "dark", "system"] as const).map((option) => {
                    const active = theme === option;

                    return (
                      <button
                        key={option}
                        onClick={() => setTheme(option as ThemeMode)}
                        className={[
                          "rounded-xl border px-3 py-3 text-sm font-medium transition",
                          active
                            ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
                        ].join(" ")}
                      >
                        <span className="flex items-center justify-center gap-2 capitalize">
                          {option === "light" ? (
                            <Sun className="h-4 w-4" />
                          ) : option === "dark" ? (
                            <Moon className="h-4 w-4" />
                          ) : (
                            <Palette className="h-4 w-4" />
                          )}
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <ToggleRow
                title="Compact mode"
                description="Reduce vertical spacing for denser tables and panels."
                checked={compactMode}
                onChange={setCompactMode}
              />
            </div>
          </Panel>

          <Panel title="Scorecard template" subtitle="Default evaluation criteria for candidate interviews.">
            <div className="mt-5 space-y-3">
              {["Role fit", "Technical depth", "Communication", "Problem solving", "Culture add"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
              Edit template
            </button>
          </Panel>

          <Panel title="Workspace summary">
            <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Active roles</span>
                <span className="font-medium text-slate-900 dark:text-white">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Recruiters</span>
                <span className="font-medium text-slate-900 dark:text-white">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Interviewers</span>
                <span className="font-medium text-slate-900 dark:text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Default timezone</span>
                <span className="font-medium text-slate-900 dark:text-white">Europe/Rome</span>
              </div>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}

function Panel({
  icon,
  title,
  subtitle,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function Input({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-600"
      />
    </div>
  );
}

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/50">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative mt-1 inline-flex h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-slate-900 dark:bg-white" : "bg-slate-300 dark:bg-slate-700",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white transition dark:bg-slate-900",
            checked ? "translate-x-5" : "translate-x-0.5",
            "mt-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}