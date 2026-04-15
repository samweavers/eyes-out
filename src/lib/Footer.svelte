<script>
  import { ShieldAlert, Tent, Pill, TriangleAlert } from "lucide-svelte"
  import { reportColors } from "$lib/stores/reportColors"
  import { reportCounts, reportTotal } from "$lib/stores/reports"
  import { page } from "$app/stores"

  const links = [
    {
      label: "Encampment",
      href: "/report?crime=encampment",
      icon: Tent,
      color: reportColors.encampment,
      type: "encampment",
    },
    {
      label: "Drug Activity",
      href: "/report?crime=drug-activity",
      icon: Pill,
      color: reportColors.drugs,
      type: "drugs",
    },
    {
      label: "Suspicious",
      href: "/report?crime=suspicious",
      icon: ShieldAlert,
      color: reportColors.suspicious,
      type: "suspicious",
    },
    {
      label: "Other",
      href: "/report?crime=other",
      icon: TriangleAlert,
      color: reportColors.other,
      type: "all",
    },
  ]

  $: civilian = $page.url.pathname !== "/admin"
</script>

{#if civilian}
  <a
    href="/alert"
    class="bg-cyan-900 shadow-lg absolute right-0 bottom-[13%] z-[55] flex items-center rounded-l-lg gap-1 text-sm font-bold text-white p-2"
  >
    <TriangleAlert class="text-yellow-500" size={20} />
    1 ACTIVE WARNING
  </a>

  <footer class="fixed bottom-0 left-0 right-0 z-[45] p-4 pt-20 footer-civilian">
    <div
      class="mx-auto max-w-md rounded-full border border-gray-200 bg-white big-shadow"
    >
      <nav class="grid grid-cols-4 p-2">
        {#each links as link}
          <a
            href={link.href}
            class="relative flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium text-gray-600 hover:text-black"
          >
            <span
              class="absolute top-1 right-5 flex h-5 w-5 items-center justify-center rounded-full text-[12px] font-bold text-white"
              style="background: {link.color.bg};"
            >
              {link.type === "all"
                ? $reportTotal
                : ($reportCounts[link.type] ?? 0)}
            </span>
            <svelte:component
              this={link.icon}
              size={24}
              color={link.color.bg}
            />
            <span>{link.label}</span>
          </a>
        {/each}
      </nav>
    </div>
  </footer>
  {:else}
  <footer class="fixed bottom-0 left-0 right-0 z-[45] p-1 pb-10">
    <div class="flex gap-1">
      <div class="flex flex-col gap-1 ">
        <div class="w-full bg-white p-2 flex flex-col gap-1 rounded-md shadow-md">
          <p class="footer-heading"><strong class="text-sm">62 REPORTS</strong>IN DIVISION 1</p>
          <hr>
          <p class="text-xs flex w-full justify-between">Drug Activity<span class="text-green-600 font-semibold">+15%</span></p>
          <hr>
          <p class="text-xs font-bold">Possible Causes:</p>
          <ul>
            <li class="text-xs">Warmer Weather</li>
            <li class="text-xs">Concert in Area</li>
            <li class="text-xs">Homelessness</li>
            <li class="text-xs">Fireworks</li>
          </ul>
        </div>
        <div class="w-full bg-white p-2 flex flex-col gap-1 rounded-md shadow-md">
          <p class="footer-heading"><strong class="text-sm">RECENT INCIDENTS</strong></p>
          <div class="flex flex-col gap-[2px]">
            <p class="whitespace-nowrap text-xs bg-gray-200 py-[2px] px-[4px] flex justify-between items-center gap-4">Suspected drug deal <span class="text-[10px]">13m</span></p>
            <p class="whitespace-nowrap text-xs bg-gray-200 py-[2px] px-[4px] flex justify-between items-center gap-4">Large, loud encampment <span class="text-[10px]">24m</span></p>
            <p class="whitespace-nowrap text-xs bg-gray-200 py-[2px] px-[4px] flex justify-between items-center gap-4">Man peeking in windows <span class="text-[10px]">30m</span></p>
            <p class="whitespace-nowrap text-xs bg-gray-200 py-[2px] px-[4px] flex justify-between items-center gap-4">Suspect with knife <span class="text-[10px]">41m</span></p>
          </div>
        </div>
      </div>
      <div class="w-full bg-cyan-900 text-white p-2 flex flex-col gap-1 rounded-md shadow-md">
        <p class="footer-heading"><strong class="text-sm">ONGOING EVENTS</strong></p>
        <hr>
        <div>
          <p class="text-xs"><strong>Concert</strong></p>
          <p class="text-xs">Tom Petty & Heartbreakers</p>
          <p class="text-xs">Tonight - 4pm-7pm</p>
        </div>
        <hr>
        <div>
          <p class="text-xs"><strong>Concert</strong></p>
          <p class="text-xs">Alice in Chains</p>
          <p class="text-xs">Tonight: 8pm-11pm</p>
        </div>
      </div>
    </div>
  </footer>
{/if}

<style>
  .footer-civilian {
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(219, 234, 254, 0.75),
      rgba(147, 197, 253, 0.9)
    );
  }
  .footer-heading {
    @apply flex items-center gap-1 text-xs whitespace-nowrap tracking-tight;
  }
</style>
