<script lang="ts">
  import { Minus, TrendingDown, TrendingUp } from 'lucide-svelte';
  import { cn, type IconType } from '$lib/utils';

  let {
    label,
    value,
    delta,
    deltaTone = 'muted',
    trend,
    note,
    icon: Icon,
    accent,
    class: className,
  }: {
    label: string;
    value: string | number;
    /** The movement, if there is one worth showing. */
    delta?: string;
    deltaTone?: 'good' | 'bad' | 'warn' | 'accent' | 'muted';
    /**
     * Draws an arrow beside the delta. Left off deliberately where the delta is
     * a level rather than a change — an arrow claims a direction, and a median
     * margin printed next to a count has not moved anywhere.
     */
    trend?: 'up' | 'down' | 'flat';
    note?: string;
    icon?: IconType;
    /**
     * A CSS colour for the tile's own identity — the rule along its top and
     * the chip behind its icon. It says which tile this is, never how it is
     * doing: the delta beside the number is the only thing here allowed to
     * carry a verdict, and a tile that changed colour with its value would
     * make a row of them read as a traffic light.
     */
    accent?: string;
    class?: string;
  } = $props();

  const toneColor: Record<string, string> = {
    good: 'var(--green-500)',
    bad: 'var(--red-400)',
    warn: 'var(--amber-500)',
    accent: 'var(--accent)',
    muted: 'var(--text-muted)',
  };

  const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };
  const TrendIcon = $derived(trend ? trendIcon[trend] : null);
  const color = $derived(
    trend
      ? toneColor[trend === 'up' ? 'good' : trend === 'down' ? 'bad' : 'muted']
      : toneColor[deltaTone],
  );
</script>

<div
  class={cn('kpi', accent && 'kpi-accent', className)}
  style={accent ? `--kpi-accent: ${accent};` : undefined}
>
  <div class="flex items-center gap-2" style="color: var(--text-faint);">
    {#if Icon}
      {#if accent}
        <span class="kpi-chip"><Icon size={14} strokeWidth={2.25} /></span>
      {:else}
        <Icon size={13} strokeWidth={2} />
      {/if}
    {/if}
    <span class="lbl">{label}</span>
  </div>

  <div class="flex items-baseline gap-2">
    <span class="num">{value}</span>
    {#if delta}
      <span
        class="inline-flex items-center gap-0.5 text-[12px] font-semibold"
        style="color: {color};"
      >
        {#if TrendIcon}<TrendIcon size={13} strokeWidth={2} />{/if}
        {delta}
      </span>
    {/if}
  </div>

  {#if note}<span class="text-[12px]" style="color: var(--text-faint);">{note}</span>{/if}
</div>
