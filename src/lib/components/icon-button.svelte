<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { cn, type IconType } from '$lib/utils';

  /**
   * A square control that is only its glyph. The label is required — it is the
   * accessible name and the tooltip both, because there is no text to read.
   */
  type Props = {
    icon: IconType;
    label: string;
    size?: 'sm' | 'md';
    active?: boolean;
    /** A small count over the top-right corner, e.g. unread alerts. */
    badge?: number | string | null;
    href?: string;
    class?: string;
  } & HTMLButtonAttributes &
    HTMLAnchorAttributes;

  let {
    icon: Icon,
    label,
    size = 'md',
    active = false,
    badge = null,
    href,
    class: className,
    ...rest
  }: Props = $props();

  const classes = $derived(cn('iconbtn', size === 'sm' && 'iconbtn-sm', className));
  const glyph = $derived(size === 'sm' ? 14 : 16);
</script>

{#if href}
  <a {href} class={classes} data-on={active ? '1' : '0'} aria-label={label} title={label} {...rest}>
    <Icon size={glyph} strokeWidth={2} />
    {#if badge}<span class="iconbtn-badge">{badge}</span>{/if}
  </a>
{:else}
  <button
    type="button"
    class={classes}
    data-on={active ? '1' : '0'}
    aria-label={label}
    title={label}
    {...rest}
  >
    <Icon size={glyph} strokeWidth={2} />
    {#if badge}<span class="iconbtn-badge">{badge}</span>{/if}
  </button>
{/if}
