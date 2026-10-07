<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Package } from 'lucide-svelte';
  import type { IconType } from '$lib/utils';

  let {
    title,
    description,
    icon: Icon = Package,
    action,
  }: { title: string; description?: string; icon?: IconType; action?: Snippet } = $props();
</script>

<div class="grid justify-items-center gap-3 px-6 py-12 text-center">
  <span
    class="grid h-11 w-11 place-items-center rounded-xl"
    style="background: var(--surface-raised); border: 1px solid var(--line-2); color: var(--text-faint);"
  >
    <Icon size={20} strokeWidth={1.75} />
  </span>
  <div class="grid max-w-85 gap-1">
    <h5 class="m-0">{title}</h5>
    {#if description}
      <p class="m-0 text-[13px] text-pretty" style="color: var(--text-muted);">{description}</p>
    {/if}
  </div>
  {#if action}{@render action()}{/if}
</div>
