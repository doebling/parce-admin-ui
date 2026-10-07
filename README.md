# parce-admin-ui

A dense admin UI kit for **SvelteKit** and **Tailwind CSS 4** — for back offices, dashboards and internal tools. Dark by default, with a light theme and two seasonal ones.

A near-neutral graphite ground under a single teal-blue accent, with colour reserved for state. Set in IBM Plex at a 13px base so that a whole screen of state fits above the fold.

## Why the name

_parce_ reads three ways, and all three fit:

- **parse** — sounds like it: taking raw data apart and making it readable is what an admin screen does.
- **parce** — Colombian slang for _buddy_: the tool you lean on every day.
- **parce que** — French for _because_: the reason things on the screen look the way they do.

## Install

```sh
bun add @doebling/parce-admin-ui lucide-svelte
```

Peer dependencies: `svelte` 5, `tailwindcss` 4 (with `@tailwindcss/vite`), `lucide-svelte`.

## Setup

**1. Import the theme after Tailwind** in your global stylesheet:

```css
/* src/app.css */
@import 'tailwindcss';
@import '@doebling/parce-admin-ui/theme.css';
```

**2. Load the fonts** in `src/app.html`. They are linked rather than `@import`ed, because an import after Tailwind's rules is dropped by the browser.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
/>
```

**3. Use the components:**

```svelte
<script lang="ts">
  import { Button, Panel, Stat } from '@doebling/parce-admin-ui';
  import { Euro, Plus } from 'lucide-svelte';
</script>

<Stat label="Revenue" value="48.210 €" delta="+12,4 %" trend="up" icon={Euro} />

<Panel title="Invoices" note="October 2026">
  {#snippet action()}
    <Button size="sm" variant="primary"><Plus size={14} /> New</Button>
  {/snippet}
  …
</Panel>
```

## Components

| Component       | What it is                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------- |
| `Button`        | `primary` · `secondary` · `ghost` · `danger`; sizes `sm` · `lg` · `icon`; `href`, `loading` |
| `IconButton`    | A square glyph-only control with a required `label` and an optional `badge`                 |
| `Badge`         | Status tag: `neutral` · `accent` · `success` · `warning` · `info` · `danger` · `outline`    |
| `Panel`/`Card`  | Titled card with `note`, `action` and `footer` snippets; `padding="0"` for tables           |
| `Stat`          | KPI tile with `delta`, `trend`, `note`, `icon` and an identity `accent` colour              |
| `Field`         | Label, control, and one line of `hint` or `error`                                           |
| `Input`         | Text input, `bind:value`                                                                    |
| `SearchInput`   | Input with a leading icon                                                                   |
| `Tabs`          | Underlined filter strip; items with `href` render as links                                  |
| `Meter`         | Share or health bar, `pct` 0–100                                                            |
| `Notice`        | Tinted band for `warning` · `danger` · `info` · `success`                                   |
| `ThemeSwitcher` | A select for the theme that stores the choice and follows the OS on `system`                |
| `Empty`         | Empty state with icon, description and an `action` snippet                                  |

Also exported: `cn()` (clsx + tailwind-merge), the `IconType` type, and the theme helpers below.

## Theme classes

Not everything needs a component. The theme also styles plain markup:

- **Type** — `.p-display` `.p-h1` `.p-h2` `.p-h3` `.p-body` `.p-small` `.p-caption` `.lbl` `.num` `.sect` `.mono` `.tabular`
- **Forms** — `.input` (also on `select` and `textarea`), `.seg` / `.seg-opt` (segmented control), `.switch` (on a checkbox)
- **Surfaces** — `.card`, `.panel`, `.kpi`, `.dialog-backdrop` / `.dialog`
- **Tables** — `.table`, `.cell-r`, `.cell-truncate`, `.row-link`, `tr[data-on='1']`
- **Navigation** — `.navitem` (`data-on='1'` for the current one), `.navitem-count`, `.navitem-badge`, `.pg` pagination
- **Bits** — `.pill`, `.dot`, `.live-dot` / `.live-pulse`, `.hr`
- **Charts** — `.vchart` / `.vcol` / `.vseg`, `.legend`, `.donut`, `.rank-row`, `.chart-tip`

## Tokens

Everything is written in CSS custom properties on `:root`, so you can override any of them after the import:

- **Ramps** — `--n-0` … `--n-11` (neutral, ground to ink), `--accent-*` (teal by default), `--red-*`, plus `--green-500`, `--amber-500`, `--blue-500`, `--violet-500`
- **Roles** — `--surface-*`, `--text-*`, `--line-*`, `--accent*`, `--status-{success,warning,info,danger,neutral}-{fg,bg}`
- **Data viz** — `--viz-1` … `--viz-8` (categorical, colour-blind-safe in this order), `--viz-step-1` … `--viz-step-4` (ordinal)
- **Scale** — `--fs-*`, `--sp-*`, `--r-*`, `--shadow-*`, `--dur-*`, `--ease-*`, layout sizes such as `--sidebar-w`

Tailwind's `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border` point at the same tokens.

### Legacy aliases

`compat.css` maps older generic names (`--color-good`, `--color-divider`, `--color-neutral-*`, …) onto the tokens. Only needed for screens written against those names:

```css
@import '@doebling/parce-admin-ui/theme.css';
@import '@doebling/parce-admin-ui/compat.css';
```

## Themes

| Theme       | Look                                                        |
| ----------- | ----------------------------------------------------------- |
| `dark`      | Graphite and teal. The default — no attribute needed.       |
| `light`     | The same palette turned over: white cards on pale grey.     |
| `halloween` | Violet-black ground, pumpkin accent, a glow in two corners. |
| `christmas` | Pine ground, gold accent, a little snow.                    |

A theme is an attribute on the root element:

```html
<html data-theme="light"></html>
```

To let people pick one, drop in the switcher and add a small script to `src/app.html`, before `%sveltekit.head%`, so the page paints in the stored theme rather than flashing dark first:

```svelte
<ThemeSwitcher />
```

```html
<script>
  try {
    var t = localStorage.getItem('parce-theme') || 'dark';
    if (t === 'system') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
  } catch (e) {}
</script>
```

Or drive it yourself with `setTheme('christmas')`, `getThemeChoice()` and `resolveTheme()`; `themes` lists the names. `system` follows the OS between light and dark.

A theme only re-points tokens — ramps such as `--n-*`, `--accent-*`, `--red-*` and the roles built on them — so your own theme is a block of overrides:

```css
:root[data-theme='ocean'] {
  --accent-400: #4fb3d9;
  --accent-500: #1f8fbf;
  /* … */
}
```

Ramps keep their direction in every theme: the low steps stand out against the ground, the high steps sink into it. `--viz-*` stays the same everywhere.

## Development

```sh
bun install
bun run dev      # demo page with every component
bun run check    # svelte-check
bun run build    # builds the demo and packages the library into dist/
```

## License

[MIT](LICENSE)
