<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  /** A label, a control, and the one line that explains it. */
  let {
    label,
    hint,
    error,
    required = false,
    for: htmlFor,
    class: className,
    children,
  }: {
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    for?: string;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div class={cn('field', className)}>
  {#if label}
    <label for={htmlFor}>
      {label}{#if required}<span style="color: var(--accent);">&nbsp;*</span>{/if}
    </label>
  {/if}
  {@render children()}
  {#if error}
    <span class="field-error">{error}</span>
  {:else if hint}
    <span class="field-hint">{hint}</span>
  {/if}
</div>
