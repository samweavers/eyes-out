<script>
  import { ShieldAlert, Tent, Pill, TriangleAlert } from "lucide-svelte"
  import { reportColors } from "$lib/stores/reportColors"
  import { reportCounts, reportTotal } from "$lib/stores/reports"

  const links = [
    {
      label: "Encampment",
      href: "/#encampment",
      icon: Tent,
      color: reportColors.encampment,
      type: "encampment",
    },
    {
      label: "Drug Activity",
      href: "/#drug-activity",
      icon: Pill,
      color: reportColors.drugs,
      type: "drugs",
    },
    {
      label: "Suspicious",
      href: "/#suspicious",
      icon: ShieldAlert,
      color: reportColors.suspicious,
      type: "suspicious",
    },
    {
      label: "All Reports",
      href: "/#all-reports",
      icon: TriangleAlert,
      color: reportColors.other,
      type: "all",
    },
  ]
</script>

<footer class="fixed bottom-0 left-0 right-0 z-50 p-4 pt-20">
  <div
    class="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl big-shadow"
  >
    <nav class="grid grid-cols-4">
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
          <svelte:component this={link.icon} size={24} color={link.color.bg} />
          <span>{link.label}</span>
        </a>
      {/each}
    </nav>
  </div>
</footer>

<style>
  footer {
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(219, 234, 254, 0.75),
      rgba(147, 197, 253, 0.9)
    );
  }
</style>
