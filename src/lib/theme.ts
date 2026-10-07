/** The themes theme.css ships, as values for `<html data-theme>`. */
export const themes = ['dark', 'light', 'halloween', 'christmas'] as const;
export type Theme = (typeof themes)[number];
/** What a person picks: a theme, or whatever the operating system prefers. */
export type ThemeChoice = Theme | 'system';

/** Where the choice is kept. The inline script in the README reads the same key. */
export const THEME_KEY = 'parce-theme';

const isChoice = (v: unknown): v is ThemeChoice =>
  v === 'system' || themes.includes(v as Theme);

/** The theme a choice comes to right now — `system` asks the OS for light or dark. */
export function resolveTheme(choice: ThemeChoice): Theme {
  if (choice !== 'system') return choice;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** The stored choice, or `dark` when there is none (or storage is blocked). */
export function getThemeChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (isChoice(stored)) return stored;
  } catch {
    // Private mode or blocked storage: fall through to the default.
  }
  return 'dark';
}

/** Applies a choice to the page and remembers it. */
export function setTheme(choice: ThemeChoice) {
  document.documentElement.dataset.theme = resolveTheme(choice);
  try {
    localStorage.setItem(THEME_KEY, choice);
  } catch {
    // The theme still applies for this visit.
  }
}
