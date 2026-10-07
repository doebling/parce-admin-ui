<script lang="ts" module>
  export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
  export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { LoaderCircle } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  type Props = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    block?: boolean;
    /** Swaps the leading glyph for a spinner and stops the control answering. */
    loading?: boolean;
    class?: string;
    children: Snippet;
  } & HTMLButtonAttributes &
    HTMLAnchorAttributes;

  let {
    variant = 'secondary',
    size = 'default',
    href,
    block = false,
    loading = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const classes = $derived(
    cn(
      'btn',
      `btn-${variant}`,
      size === 'sm' && 'btn-sm',
      size === 'lg' && 'btn-lg',
      size === 'icon' && 'btn-icon',
      block && 'btn-block',
      className,
    ),
  );
  const glyph = $derived(size === 'sm' ? 14 : size === 'lg' ? 18 : 16);
</script>

{#if href}
  <a {href} class={classes} {...rest}>
    {#if loading}<LoaderCircle size={glyph} strokeWidth={2} class="animate-spin" />{/if}
    {@render children()}
  </a>
{:else}
  <button class={classes} disabled={loading || rest.disabled} {...rest}>
    {#if loading}<LoaderCircle size={glyph} strokeWidth={2} class="animate-spin" />{/if}
    {@render children()}
  </button>
{/if}
