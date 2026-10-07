<script lang="ts">
  import {
    Badge,
    Button,
    Empty,
    Field,
    IconButton,
    Input,
    Meter,
    Notice,
    Panel,
    SearchInput,
    Stat,
    Tabs,
    ThemeSwitcher,
  } from '$lib';
  import {
    Bell,
    Box,
    CircleAlert,
    Euro,
    FileText,
    Info,
    LayoutDashboard,
    Palette,
    Plus,
    Settings,
    ShoppingCart,
    SquareMousePointer,
    Table,
    Trash2,
    Users,
  } from 'lucide-svelte';

  const sections = [
    { id: 'buttons', label: 'Buttons', icon: SquareMousePointer },
    { id: 'stats', label: 'Stats & meters', icon: LayoutDashboard },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'tables', label: 'Panels & tables', icon: Table },
    { id: 'feedback', label: 'Feedback', icon: Bell },
    { id: 'tokens', label: 'Tokens', icon: Palette },
  ];

  let tab = $state('open');
  let search = $state('');
  let loading = $state(false);
  let dialog = $state(false);

  const rows = [
    {
      no: 'INV-2026-014',
      customer: 'Northwind GmbH',
      date: '02.10.2026',
      total: '1.240,00 €',
      state: 'paid',
    },
    {
      no: 'INV-2026-015',
      customer: 'Contoso AG',
      date: '04.10.2026',
      total: '380,50 €',
      state: 'open',
    },
    {
      no: 'INV-2026-016',
      customer: 'Fabrikam KG',
      date: '05.10.2026',
      total: '2.975,00 €',
      state: 'overdue',
    },
  ] as const;
  const stateTone = { paid: 'success', open: 'info', overdue: 'danger' } as const;

  const ramps = [
    ['n', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']],
    ['accent', ['100', '200', '300', '400', '500', '600', '700', '800']],
    ['red', ['100', '200', '300', '400', '500', '600', '700', '800']],
    ['viz', ['1', '2', '3', '4', '5', '6', '7', '8']],
  ] as const;
</script>

<svelte:head><title>parce-admin-ui</title></svelte:head>

<div class="shell">
  <aside class="side">
    <div class="flex items-center gap-2 px-2.5 pb-4">
      <img src="favicon.svg" alt="" width="22" height="22" />
      <span class="p-h3">parce-admin-ui</span>
    </div>
    <nav class="grid gap-0.5">
      {#each sections as s, i (s.id)}
        {@const Icon = s.icon}
        <a class="navitem" href="#{s.id}" data-on={i === 0 ? '1' : '0'}>
          <Icon size={16} strokeWidth={2} />
          {s.label}
          {#if s.id === 'feedback'}<span class="navitem-badge">3</span>{/if}
          {#if s.id === 'tokens'}<span class="navitem-count">40</span>{/if}
        </a>
      {/each}
    </nav>
  </aside>

  <main class="main grid gap-10">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span class="lbl">Component library</span>
        <h1 class="p-display mt-1 mb-1">parce-admin-ui</h1>
        <p class="p-small m-0">
          A dense admin UI kit for SvelteKit and Tailwind CSS 4 — dark by default, with light and
          seasonal themes.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <span class="live-dot live-pulse" style="background: var(--green-500);"></span>
        <span class="p-caption">Live</span>
        <ThemeSwitcher />
        <IconButton icon={Bell} label="Notifications" badge={3} />
        <IconButton icon={Settings} label="Settings" />
      </div>
    </header>

    <section id="buttons" class="grid gap-4">
      <h2 class="sect">Buttons</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button variant="primary"><Plus size={16} strokeWidth={2} /> New invoice</Button>
        <Button>Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger"><Trash2 size={16} strokeWidth={2} /> Delete</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button
          variant="primary"
          {loading}
          onclick={() => {
            loading = true;
            setTimeout(() => (loading = false), 1500);
          }}>Save</Button
        >
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add"><Plus size={16} strokeWidth={2} /></Button>
        <Button href="#tokens" variant="ghost">As a link</Button>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Neutral</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Paid</Badge>
        <Badge variant="warning">Due soon</Badge>
        <Badge variant="info">Open</Badge>
        <Badge variant="danger" icon={CircleAlert}>Overdue</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="neutral" uppercase>Draft</Badge>
        <span class="pill" style="color: var(--green-500);">Running</span>
        <span class="pill" style="color: var(--amber-500);">Paused</span>
      </div>
    </section>

    <section id="stats" class="grid gap-4">
      <h2 class="sect">Stats & meters</h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Revenue"
          value="48.210 €"
          delta="+12,4 %"
          trend="up"
          note="vs. last year"
          icon={Euro}
          accent="var(--viz-1)"
        />
        <Stat
          label="Orders"
          value="1.284"
          delta="−3,1 %"
          trend="down"
          icon={ShoppingCart}
          accent="var(--viz-3)"
        />
        <Stat label="Customers" value="312" delta="+8" deltaTone="good" icon={Users} />
        <Stat label="Stock items" value="2.045" note="across 3 warehouses" icon={Box} />
      </div>
      <div class="panel grid gap-3">
        {#each [['Accent', 72, 'accent'], ['Success', 45, 'success'], ['Warning', 18, 'warning']] as [label, pct, tone] (label)}
          <div class="rank-row">
            <span class="p-small">{label}</span>
            <span class="p-caption tabular">{pct} %</span>
          </div>
          <Meter pct={Number(pct)} tone={tone as 'accent' | 'success' | 'warning'} />
        {/each}
      </div>
    </section>

    <section id="forms" class="grid gap-4">
      <h2 class="sect">Forms</h2>
      <Panel title="Customer" note="Fields, inputs and the controls the theme styles">
        <div class="grid gap-4 sm:grid-cols-2">
          <Field label="Name" for="name" required hint="As it appears on the invoice.">
            <Input id="name" placeholder="Northwind GmbH" />
          </Field>
          <Field label="VAT ID" for="vat" error="That does not look like a VAT ID.">
            <Input id="vat" value="DE12" class="input-mono" />
          </Field>
          <Field label="Country" for="country">
            <select id="country" class="input">
              <option>Germany</option>
              <option>Austria</option>
              <option>Switzerland</option>
            </select>
          </Field>
          <Field label="Search" for="search">
            <SearchInput id="search" placeholder="Search customers…" bind:value={search} />
          </Field>
          <Field label="Notes" for="notes" class="sm:col-span-2">
            <textarea id="notes" class="input" placeholder="Anything worth remembering"></textarea>
          </Field>
          <div class="flex flex-wrap items-center gap-6">
            <div class="seg">
              <label class="seg-opt"><input type="radio" name="period" checked /> Month</label>
              <label class="seg-opt"><input type="radio" name="period" /> Quarter</label>
              <label class="seg-opt"><input type="radio" name="period" /> Year</label>
            </div>
            <label class="flex items-center gap-2 p-small">
              <input type="checkbox" class="switch" checked /> Send reminders
            </label>
            <label class="flex items-center gap-2 p-small">
              <input type="checkbox" checked /> Checkbox
            </label>
          </div>
        </div>
        {#snippet footer()}
          <div class="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save customer</Button>
          </div>
        {/snippet}
      </Panel>
    </section>

    <section id="tables" class="grid gap-4">
      <h2 class="sect">Panels & tables</h2>
      <Tabs
        items={[
          { value: 'open', label: 'Open', count: 2 },
          { value: 'paid', label: 'Paid', count: 1 },
          { value: 'all', label: 'All', count: 3 },
        ]}
        value={tab}
        onchange={(v) => (tab = v)}
      />
      <Panel title="Invoices" note="October 2026" padding="0">
        {#snippet action()}
          <Button size="sm" variant="primary"><Plus size={14} strokeWidth={2} /> New</Button>
        {/snippet}
        <table class="table">
          <thead>
            <tr
              ><th>Number</th><th>Customer</th><th>Date</th><th class="cell-r">Total</th><th
                >Status</th
              ></tr
            >
          </thead>
          <tbody>
            {#each rows as r, i (r.no)}
              <tr data-on={i === 1 ? '1' : '0'}>
                <td class="mono"><a class="row-link" href="#tables">{r.no}</a></td>
                <td>{r.customer}</td>
                <td class="text-muted">{r.date}</td>
                <td class="cell-r">{r.total}</td>
                <td><Badge variant={stateTone[r.state]}>{r.state}</Badge></td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#snippet footer()}
          <div class="flex items-center justify-between">
            <span class="p-caption">3 of 3</span>
            <div class="flex gap-1">
              <span class="pg pg-off">‹</span>
              <a class="pg pg-on" href="#tables">1</a>
              <a class="pg" href="#tables">2</a>
              <a class="pg" href="#tables">›</a>
            </div>
          </div>
        {/snippet}
      </Panel>
      <Panel title="Nothing here yet">
        <Empty title="No expenses" description="Upload a receipt and it shows up here.">
          {#snippet action()}<Button variant="primary">Upload receipt</Button>{/snippet}
        </Empty>
      </Panel>
    </section>

    <section id="feedback" class="grid gap-4">
      <h2 class="sect">Feedback</h2>
      <Notice icon={CircleAlert}>Sending is switched off, so nothing on this page goes out.</Notice>
      <Notice tone="danger" icon={CircleAlert}>The last sync failed: connection refused.</Notice>
      <Notice tone="info" icon={Info}>Figures for the current month are provisional.</Notice>
      <Notice tone="success">All invoices for September are paid.</Notice>
      <div><Button onclick={() => (dialog = true)}>Open dialog</Button></div>
    </section>

    <section id="tokens" class="grid gap-4">
      <h2 class="sect">Tokens</h2>
      <div class="panel grid gap-4">
        {#each ramps as [name, steps] (name)}
          <div class="grid gap-1.5">
            <span class="lbl">--{name}-*</span>
            <div class="flex flex-wrap gap-1.5">
              {#each steps as step (step)}
                <div class="grid gap-1">
                  <span class="swatch" style="background: var(--{name}-{step});"></span>
                  <span class="p-caption mono">{step}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
        <hr class="hr" />
        <div class="grid gap-2">
          <span class="p-display">Display 26</span>
          <span class="p-h1">Heading 1 · 20</span>
          <span class="p-h2">Heading 2 · 16</span>
          <span class="p-h3">Heading 3 · 14</span>
          <span class="p-body">Body · 13 — the ground the whole interface is set on.</span>
          <span class="p-small">Small · 12.5</span>
          <span class="p-caption">Caption · 11.5</span>
          <span class="lbl">Micro label · 11</span>
          <span class="num">1.284,50 €</span>
        </div>
      </div>
    </section>
  </main>
</div>

{#if dialog}
  <div class="dialog-backdrop" role="presentation" onclick={() => (dialog = false)}>
    <div
      class="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dlg-title"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.key === 'Escape' && (dialog = false)}
    >
      <div id="dlg-title" class="dialog-title">Delete invoice?</div>
      <div class="dialog-body">INV-2026-015 will be removed. This cannot be undone.</div>
      <div class="dialog-actions">
        <Button variant="ghost" onclick={() => (dialog = false)}>Cancel</Button>
        <Button variant="danger" onclick={() => (dialog = false)}>Delete</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .shell {
    display: grid;
    grid-template-columns: var(--sidebar-w) minmax(0, 1fr);
    min-height: 100vh;
  }
  .side {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: var(--sp-4) var(--sp-3);
    background: var(--surface-chrome);
    border-right: 1px solid var(--line-1);
  }
  .main {
    max-width: 1100px;
    padding: var(--page-pad-y) var(--page-pad-x) var(--sp-20);
  }
  .swatch {
    display: block;
    width: 40px;
    height: 28px;
    border-radius: var(--r-sm);
    border: 1px solid var(--line-1);
  }
  @media (max-width: 760px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
    }
    .side {
      display: none;
    }
    .main {
      padding: var(--sp-5) var(--sp-4) var(--sp-16);
    }
  }
</style>
