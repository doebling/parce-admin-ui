<script lang="ts" module>
  export interface TabItem {
    value: string;
    label: string;
    count?: number | null;
    /** Where the tab goes, when the filter lives in the URL rather than in state. */
    href?: string;
  }
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  /**
   * The filter strip over a collection. Tabs that carry an `href` render as
   * links, so a filtered catalog stays a shareable, reloadable address; the
   * rest report through `onchange`.
   */
  let {
    items,
    value,
    onchange,
    class: className,
  }: {
    items: TabItem[];
    value: string;
    onchange?: (value: string) => void;
    class?: string;
  } = $props();
</script>

<div class={cn('tabs', className)} role="tablist">
  {#each items as item (item.value)}
    {@const on = item.value === value}
    {#if item.href}
      <a class="tab" href={item.href} role="tab" aria-selected={on}>
        {item.label}
        {#if item.count != null}<span class="tab-count">{item.count}</span>{/if}
      </a>
    {:else}
      <button
        type="button"
        class="tab"
        role="tab"
        aria-selected={on}
        onclick={() => onchange?.(item.value)}
      >
        {item.label}
        {#if item.count != null}<span class="tab-count">{item.count}</span>{/if}
      </button>
    {/if}
  {/each}
</div>
