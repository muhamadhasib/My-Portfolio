import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Theme = "dark" | "light";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(
  undefined
);

const THEME_TRANSITION_MS = 120;

function readStoredTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeToDocument(next: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(next);
  root.style.colorScheme = next;
  localStorage.setItem("theme", next);
}

function runThemeTransition(updateDom: () => void) {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    updateDom();
    return;
  }

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(updateDom);
    return;
  }

  root.classList.add("theme-transition");
  updateDom();
  requestAnimationFrame(() => {
    window.setTimeout(
      () => root.classList.remove("theme-transition"),
      THEME_TRANSITION_MS
    );
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const setTheme = useCallback((next: Theme) => {
    if (next === themeRef.current) return;
    runThemeTransition(() => {
      applyThemeToDocument(next);
      setThemeState(next);
    });
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(themeRef.current === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
