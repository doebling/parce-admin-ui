<script lang="ts">
  import { onMount } from 'svelte';

  /**
   * Falling snow drawn on a canvas, behind the content. Every flake has a
   * depth: far flakes are small, dim and slow, near ones large, soft and
   * quick, so the snow has a front and a back. Each sways on its own path,
   * and a slowly changing wind pushes the whole fall to one side in gusts —
   * the near flakes further, as they would be from where you stand.
   *
   * It only shows while the page is in one of `themes` (christmas by
   * default), and stands down for `data-snow="off"` on <html>. Someone who
   * prefers reduced motion gets the snow standing still. While it runs it sets
   * `data-snow-canvas` on <html>, which turns off the plain CSS snow.
   */
  let {
    density = 1,
    wind = 1,
    themes = ['christmas'],
  }: {
    /** More or fewer flakes; 1 is about one per 7000px² of screen. */
    density?: number;
    /** How hard the wind blows; 0 lets the snow fall straight down. */
    wind?: number;
    /** The `data-theme` values it shows in. */
    themes?: string[];
  } = $props();

  let canvas: HTMLCanvasElement;
  let active = $state(false);

  interface Flake {
    x: number;
    y: number;
    /** Depth, 0 far to 1 near. */
    z: number;
    r: number;
    vy: number;
    alpha: number;
    amp: number;
    freq: number;
    phase: number;
  }

  /** A soft round flake, drawn once and stamped at every size. */
  function sprite(soft: boolean) {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d')!;
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    if (soft) {
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
    } else {
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(250,252,255,0.9)');
      grad.addColorStop(1, 'rgba(240,246,255,0)');
    }
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }

  function flake(w: number, h: number, anywhere: boolean): Flake {
    // More far flakes than near ones, as in any real fall.
    const z = Math.random() ** 1.8;
    const r = 0.6 + z * z * 3.4 + Math.random() * 0.4;
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -r * 4 - Math.random() * 40,
      z,
      r,
      vy: 16 + z * 64 + Math.random() * 10,
      alpha: 0.3 + z * 0.6,
      amp: 4 + z * 22 + Math.random() * 6,
      freq: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    };
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const root = document.documentElement;
    const crisp = sprite(false);
    const soft = sprite(true);
    const still = matchMedia('(prefers-reduced-motion: reduce)');

    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let frame = 0;
    let last = 0;
    let t = Math.random() * 1000;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sx = w ? innerWidth / w : 1;
      const sy = h ? innerHeight / h : 1;
      w = innerWidth;
      h = innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const f of flakes) {
        f.x *= sx;
        f.y *= sy;
      }
      const count = Math.min(900, Math.round(((w * h) / 7000) * density));
      while (flakes.length < count) flakes.push(flake(w, h, true));
      flakes.length = count;
      // Far first, so the near flakes are drawn over them.
      flakes.sort((a, b) => a.z - b.z);
    }

    /** The wind right now: a few slow waves laid over each other, so it gusts. */
    function gust(t: number) {
      return (
        wind *
        (6 + 14 * Math.sin(t * 0.05) + 9 * Math.sin(t * 0.13 + 1.3) + 5 * Math.sin(t * 0.37 + 2.1))
      );
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const f of flakes) {
        const x = f.x + Math.sin(t * f.freq * Math.PI * 2 + f.phase) * f.amp;
        const s = f.z > 0.75 ? f.r * 2.6 : f.r * 2;
        ctx!.globalAlpha = f.alpha;
        ctx!.drawImage(f.z > 0.75 ? soft : crisp, x - s, f.y - s, s * 2, s * 2);
      }
      ctx!.globalAlpha = 1;
    }

    function step(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const air = gust(t);
      for (const f of flakes) {
        f.y += f.vy * dt * (1 + 0.12 * Math.sin(t * f.freq * 5 + f.phase));
        f.x += air * (0.35 + f.z) * dt;
        // A flake that has landed starts again above the top, at the same
        // depth, so the far-to-near drawing order still holds.
        if (f.y - f.r * 4 > h) {
          f.y = -f.r * 4 - Math.random() * 40;
          f.x = Math.random() * w;
          f.phase = Math.random() * Math.PI * 2;
        }
        const edge = 60;
        if (f.x > w + edge) f.x -= w + edge * 2;
        else if (f.x < -edge) f.x += w + edge * 2;
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function start() {
      if (!w) resize();
      cancelAnimationFrame(frame);
      if (still.matches) {
        draw();
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(step);
    }

    function stop() {
      cancelAnimationFrame(frame);
      ctx!.clearRect(0, 0, w, h);
    }

    function update() {
      const on = themes.includes(root.dataset.theme ?? '') && root.dataset.snow !== 'off';
      if (on === active) return;
      active = on;
      if (on) {
        root.setAttribute('data-snow-canvas', '');
        start();
      } else {
        root.removeAttribute('data-snow-canvas');
        stop();
      }
    }

    const watch = new MutationObserver(update);
    watch.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-snow'] });
    const onResize = () => {
      resize();
      if (active && still.matches) draw();
    };
    const onMotion = () => active && start();
    addEventListener('resize', onResize);
    still.addEventListener('change', onMotion);
    update();

    return () => {
      watch.disconnect();
      removeEventListener('resize', onResize);
      still.removeEventListener('change', onMotion);
      cancelAnimationFrame(frame);
      root.removeAttribute('data-snow-canvas');
    };
  });
</script>

<canvas bind:this={canvas} class="snow-canvas" hidden={!active} aria-hidden="true"></canvas>
