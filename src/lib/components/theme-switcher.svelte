<script lang="ts" module>
  import type { ThemeChoice } from '$lib/theme';

  export interface ThemeOption {
    value: ThemeChoice;
    label: string;
  }

  const defaultOptions: ThemeOption[] = [
    { value: 'system', label: 'System' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'halloween', label: 'Halloween' },
    { value: 'christmas', label: 'Christmas' },
  ];
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { getThemeChoice, setTheme } from '$lib/theme';
  import { cn } from '$lib/utils';

  /**
   * A select for the theme. It reads the stored choice on mount, applies and
   * stores a new one, and follows the OS while `system` is chosen. Pass
   * `options` to rename or leave out themes.
   */
  let {
    options = defaultOptions,
    label = 'Theme',
    size = 'sm',
    class: className,
  }: {
    options?: ThemeOption[];
    /** The accessible name — there is no visible label. */
    label?: string;
    size?: 'sm' | 'md';
    class?: string;
  } = $props();

  let value = $state<ThemeChoice>('dark');

  onMount(() => {
    value = getThemeChoice();
    const query = matchMedia('(prefers-color-scheme: light)');
    const follow = () => value === 'system' && setTheme('system');
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  });
</script>

<!-- Width set inline: `.input` is unlayered, so a Tailwind `w-auto` would lose to it. -->
<select
  class={cn('input', size === 'sm' && 'input-sm', className)}
  style="width: auto;"
  aria-label={label}
  bind:value
  onchange={() => setTheme(value)}
>
  {#each options as option (option.value)}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
