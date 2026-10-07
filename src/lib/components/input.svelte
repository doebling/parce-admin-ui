<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  let {
    class: className,
    value = $bindable(''),
    ...rest
  }: { class?: string; value?: string | number } & HTMLInputAttributes = $props();
</script>

<input bind:value class={cn('input', className)} {...rest} />
