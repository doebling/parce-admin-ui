<script lang="ts">
  import { cn } from '$lib/utils';

  /** A health or share bar. `pct` is 0–100; the colour carries the state. */
  let {
    pct,
    tone,
    color,
    height,
    class: className,
  }: {
    pct: number;
    /** The design system's three fills, when the caller has no colour of its own. */
    tone?: 'accent' | 'success' | 'warning';
    color?: string;
    /** A CSS length. The track is 6px unless a caller wants it thinner. */
    height?: string;
    class?: string;
  } = $props();

  const toneFill = {
    accent: 'var(--accent)',
    success: 'var(--green-500)',
    warning: 'var(--amber-500)',
  };
  const fill = $derived(color ?? toneFill[tone ?? 'accent']);
</script>

<div class={cn('meter', className)} style={height ? `height: ${height};` : undefined}>
  <span style="width: {Math.max(0, Math.min(100, pct))}%; background: {fill};"></span>
</div>
