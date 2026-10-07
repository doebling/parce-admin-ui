<script lang="ts" module>
  /**
   * The theme's tones, plus three short aliases. `good`/`warn`/`bad` resolve
   * to the same colours as `success`/`warning`/`danger`.
   */
  export type BadgeVariant =
    | 'neutral'
    | 'accent'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
    | 'outline'
    | 'good'
    | 'warn'
    | 'bad';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn, type IconType } from '$lib/utils';

  let {
    variant = 'neutral',
    tone,
    icon: Icon,
    uppercase = false,
    class: className,
    children,
  }: {
    variant?: BadgeVariant;
    /** The design system's name for the same prop. */
    tone?: BadgeVariant;
    icon?: IconType;
    uppercase?: boolean;
    class?: string;
    children: Snippet;
  } = $props();

  const t = $derived(tone ?? variant);
</script>

<span class={cn('tag', `tag-${t}`, uppercase && 'tag-uppercase', className)}>
  {#if Icon}<Icon size={12} strokeWidth={2} />{/if}
  {@render children()}
</span>
