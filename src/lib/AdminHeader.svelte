<script>
  import { Mail } from "lucide-svelte"
</script>

<header class="bg-cyan-900 py-2 px-4 flex justify-between w-full items-center">
  <div class="flex gap-2 items-center">
    <img
      class="w-8"
      src="https://hamiltonpolice.on.ca/sites/all/themes/hps/logo.svg"
      alt=""
    />
    <div class="flex flex-col">
      <p class="font-bold text-white text-sm">CRIME MONITOR</p>
      <p class="text-white text-xs">Hamilton Police</p>
    </div>
  </div>
  <div class="mail-icon relative">
    <Mail size="25" class="text-white" />
  </div>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    z-index: 40;
    pointer-events: none;
  }
</style>
