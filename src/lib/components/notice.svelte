<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn, type IconType } from '$lib/utils';

  /**
   * A band that says why the screen below it is not doing what it looks like.
   *
   * A plain muted paragraph is the wrong weight for what this carries: "sending
   * is switched off" explains why a whole page of scheduled work has no dates
   * on it, and in the same grey as the body text around it, a reader who skips
   * it misreads the entire screen.
   *
   * The tint and the rule down the left do the signalling; the text itself
   * stays at normal reading contrast rather than being coloured, because a
   * paragraph in amber is harder to read and no more noticeable than one on an
   * amber ground.
   */
  let {
    tone = 'warning',
    icon: Icon,
    class: className,
    children,
  }: {
    /**
     * `warning` for a switch someone deliberately set — the page is inert and
     * that is nobody's mistake. `danger` is for something actually broken, and
     * is deliberately not the default: an install where every chosen setting
     * shouts in red teaches the operator to stop reading red.
     */
    tone?: 'warning' | 'danger' | 'info' | 'success';
    icon?: IconType;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div class={cn('notice', `notice-${tone}`, className)} role="note">
  {#if Icon}
    <span class="notice-icon" aria-hidden="true"><Icon size={15} strokeWidth={1.75} /></span>
  {/if}
  <div class="notice-body"><!--
 -->{@render children()}</div>
</div>

<style>
  .notice {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    padding: 10px 13px;
    border-radius: var(--r-card);
    /* The rule carries the tone at a glance, from the edge, where the eye
       lands first when scanning a column of cards. */
    border-left: 3px solid var(--notice-fg);
    background: var(--notice-bg);
    font-size: 13px;
    line-height: 1.55;
    color: var(--text-body);
  }

  .notice-icon {
    display: flex;
    flex: none;
    /* Optical alignment with the first line rather than the box. */
    margin-top: 1px;
    color: var(--notice-fg);
  }

  .notice-body {
    min-width: 0;
  }

  .notice-warning {
    --notice-fg: var(--status-warning-fg);
    --notice-bg: var(--status-warning-bg);
  }
  .notice-danger {
    --notice-fg: var(--status-danger-fg);
    --notice-bg: var(--status-danger-bg);
  }
  .notice-info {
    --notice-fg: var(--status-info-fg);
    --notice-bg: var(--status-info-bg);
  }
  .notice-success {
    --notice-fg: var(--status-success-fg);
    --notice-bg: var(--status-success-bg);
  }
</style>
