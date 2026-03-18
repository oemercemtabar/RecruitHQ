import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
};

const THEME_STORAGE_KEY = "recruithq-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeToDocument(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;

  root.classList.remove("dark");

  if (resolved === "dark") {
    root.classList.add("dark");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";

    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }

    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    theme === "system" ? getSystemTheme() : theme,
  );

  useEffect(() => {
    applyThemeToDocument(theme);
    setResolvedTheme(theme === "system" ? getSystemTheme() : theme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const nextResolved = getSystemTheme();
        setResolvedTheme(nextResolved);
        applyThemeToDocument("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: setThemeState,
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }

  return context;
}