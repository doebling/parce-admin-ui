import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // The demo page is a static site; BASE_PATH lets it live under a sub-path (GitHub Pages).
    adapter: adapter(),
    paths: { base: process.env.BASE_PATH ?? '' },
  },
};
