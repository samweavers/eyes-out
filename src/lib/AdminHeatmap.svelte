<script>
  import { onMount } from "svelte";

  // 👉 Replace with your real data later
  export let reports = [
    { x: 60, y: 40, severity: "very-high" },
    { x: 62, y: 42, severity: "high" },
    { x: 30, y: 30, severity: "moderate" },
    { x: 58, y: 38, severity: "very-high" },
    { x: 59, y: 41, severity: "high" },
    { x: 32, y: 28, severity: "moderate" }
  ];

  // Map severity → styles
  const styles = {
    moderate: {
      size: 80,
      color: "bg-yellow-500/40",
      blur: "blur-2xl"
    },
    high: {
      size: 110,
      color: "bg-red-400/40",
      blur: "blur-2xl"
    },
    "very-high": {
      size: 140,
      color: "bg-red-700/30",
      blur: "blur-3xl"
    }
  };

  let heatPoints = [];

  // Create slight randomness so it looks natural
  function generateHeatPoints() {
    heatPoints = reports.flatMap((r) => {
      const base = styles[r.severity];

      // Each report creates multiple blobs
      return Array.from({ length: 3 }).map(() => ({
        x: r.x + (Math.random() * 6 - 3),
        y: r.y + (Math.random() * 6 - 3),
        ...base
      }));
    });
  }

  onMount(() => {
    generateHeatPoints();
  });
</script>

<style>
  .heatmap-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<div class="heatmap-container">
  <!-- 🗺️ Map background -->
  <img
    src="/map.png"
    alt="Map"
    class="absolute inset-0 w-full h-full object-cover"
  />

  <!-- 🌑 Optional dark overlay for contrast -->
  <div class="absolute inset-0"></div>

  <!-- 🔥 Heatmap blobs -->
  {#each heatPoints as point}
    <div
      class={`absolute z-[1002] rounded-full ${point.color} ${point.blur} animate-pulse`}
      style={`
        width: ${point.size}px;
        height: ${point.size}px;
        left: calc(${point.x}% - ${point.size / 2}px);
        top: calc(${point.y}% - ${point.size / 2}px);
      `}
    />
  {/each}

  <!-- 🧾 Legend -->
  <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-md text-xs space-y-1">
    <p class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
      Moderate Reports
    </p>
    <p class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-red-400"></span>
      High Reports
    </p>
    <p class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-red-700"></span>
      Very High Reports
    </p>
  </div>
</div>
