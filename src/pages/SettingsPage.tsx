import { useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Moon,
  Palette,
  Sun,
  Workflow,
} from "lucide-react";

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
  const [theme, setTheme] = useState<"Light" | "Dark" | "System">("Light");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Settings
          </h2>
          <p className="mt-2 text-slate-600">
            Configure workspace preferences, hiring process defaults, and team notifications.
          </p>
        </div>

        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
          Save changes
        </button>
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <BriefcaseBusiness className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Workspace
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Basic company and recruiting workspace settings.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Workspace name
                </label>
                <input
                  defaultValue="RecruitHQ"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Default timezone
                </label>
                <input
                  defaultValue="Europe/Rome"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Careers page URL
                </label>
                <input
                  defaultValue="careers.recruithq.io"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Default recruiter
                </label>
                <input
                  defaultValue="Claudia T."
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Workflow className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Hiring stages
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Define the default pipeline stages used across open roles.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{stage}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Stage {index + 1}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      Edit
                    </button>
                    <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Bell className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Control alerts and reminders for recruiting activity.
                </p>
              </div>
            </div>

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
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Palette className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Appearance
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Adjust the workspace display and visual preferences.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Theme</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["Light", "Dark", "System"] as const).map((option) => {
                    const active = theme === option;

                    return (
                      <button
                        key={option}
                        onClick={() => setTheme(option)}
                        className={[
                          "rounded-xl border px-3 py-3 text-sm font-medium transition",
                          active
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {option === "Light" ? (
                            <Sun className="h-4 w-4" />
                          ) : option === "Dark" ? (
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
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Scorecard template
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Default evaluation criteria for candidate interviews.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Role fit",
                "Technical depth",
                "Communication",
                "Problem solving",
                "Culture add",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Edit template
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Workspace summary
            </h3>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Active roles</span>
                <span className="font-medium text-slate-900">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Recruiters</span>
                <span className="font-medium text-slate-900">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Interviewers</span>
                <span className="font-medium text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Default timezone</span>
                <span className="font-medium text-slate-900">Europe/Rome</span>
              </div>
            </div>
          </section>
        </div>
      </section>
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
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4">
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative mt-1 inline-flex h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-slate-900" : "bg-slate-300",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white transition",
            checked ? "translate-x-5" : "translate-x-0.5",
            "mt-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}