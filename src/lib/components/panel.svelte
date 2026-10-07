<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  /**
   * The card: a titled surface with a hairline under its header.
   *
   * The header is a band of its own rather than the first thing inside the
   * body, so a card whose body is a table can drop its padding entirely
   * (`padding="0"`) and still keep a header that lines up with every other one.
   */
  let {
    title,
    note,
    subtitle,
    action,
    footer,
    padding,
    tone = 'default',
    class: className,
    bodyClass,
    children,
  }: {
    title?: string;
    /** The line under the title — context, not a second heading. */
    note?: string;
    /** Same thing, under the design system's name for it. */
    subtitle?: string;
    action?: Snippet;
    footer?: Snippet;
    /** A CSS length. `0` lets a table meet the card's own edges. */
    padding?: string;
    tone?: 'default' | 'quiet' | 'accent';
    class?: string;
    bodyClass?: string;
    children: Snippet;
  } = $props();

  const sub = $derived(subtitle ?? note);
  const pad = $derived(padding === undefined ? undefined : `padding: ${padding};`);
</script>

<section
  class={cn(
    'card',
    tone === 'quiet' && 'card-quiet',
    tone === 'accent' && 'card-accent',
    className,
  )}
>
  {#if title || action}
    <!--
      The header keeps the card's own inset whatever the body does. A card whose
      body is a table drops its padding so the table meets the card's edges, and
      a title that moved with it would stop lining up with every other header.
    -->
    <header class="card-head">
      <div class="grid min-w-0 gap-0.5">
        {#if title}<h5 class="m-0 truncate">{title}</h5>{/if}
        {#if sub}<p class="p-caption m-0 truncate font-normal">{sub}</p>{/if}
      </div>
      {#if action}
        <div class="flex flex-none items-center gap-2">{@render action()}</div>
      {/if}
    </header>
  {/if}

  <div class={cn('card-body', bodyClass)} style={pad}>{@render children()}</div>

  {#if footer}
    <footer class="card-foot">{@render footer()}</footer>
  {/if}
</section>
