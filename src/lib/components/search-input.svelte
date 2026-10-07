<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Search } from 'lucide-svelte';
  import { cn, type IconType } from '$lib/utils';

  /** An input with a leading glyph — the search box, and anything shaped like it. */
  let {
    icon: Icon = Search,
    class: className,
    value = $bindable(''),
    ...rest
  }: { icon?: IconType; class?: string; value?: string } & HTMLInputAttributes = $props();
</script>

<div class={cn('relative flex items-center', className)}>
  <span class="pointer-events-none absolute left-[10px] flex" style="color: var(--text-faint);">
    <Icon size={15} strokeWidth={2} />
  </span>
  <input bind:value class="input !pl-8" {...rest} />
</div>
