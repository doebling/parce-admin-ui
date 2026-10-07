import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ComponentType, SvelteComponent } from 'svelte';
import type { IconProps } from 'lucide-svelte';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * lucide-svelte still ships class-style components, which Svelte 5's
 * `Component` type does not describe. This is the shape to accept when a
 * component takes an icon as a prop.
 */
export type IconType = ComponentType<SvelteComponent<IconProps>>;
