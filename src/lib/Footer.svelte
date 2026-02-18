<script lang="ts">
  import { ShieldAlert, Tent, Pill, TriangleAlert } from "lucide-svelte"

  const links = [
    {
      label: "Encampment",
      href: "/#encampment",
      icon: Tent,
      style: "encampment",
      count: 4,
    },
    {
      label: "Drug Activity",
      href: "/#drug-activity",
      icon: Pill,
      style: "drugs",
      count: 2,
    },
    {
      label: "Suspicious",
      href: "/#suspicious",
      icon: ShieldAlert,
      style: "suspicious",
      count: 9,
    },
    {
      label: "All Reports",
      href: "/#all-reports",
      icon: TriangleAlert,
      style: "all",
      count: 18,
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
          {#if link.count}
            <span
              class="absolute top-1 right-5 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white"
            >
              {link.count}
            </span>
          {/if}
          <svelte:component this={link.icon} size={24} />
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
