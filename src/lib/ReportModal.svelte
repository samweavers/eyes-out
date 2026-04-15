<script>
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";

  let show = false;

  onMount(() => {
    if (window.location.pathname === "/admin") {
      setTimeout(() => {
        show = true;
      }, 3000); // delay (ms)
    }
  });

  function dismiss() {
    show = false;
  }
</script>

{#if show}
  <div
    class="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50 backdrop-blur"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
  >
    <div
      class="bg-gray-300 rounded-lg shadow-xl overflow-hidden max-w-md w-full"
      in:scale={{ duration: 200, start: 0.95 }}
      out:scale={{ duration: 150, end: 0.95 }}
    >
      <p class="bg-black p-2 text-white">Suspicious Activity</p>

      <p class="bg-gray-300 px-2 py-1 text-xs">
        2 minutes ago • James St, S • District D1
      </p>

      <img
        class="w-full"
        src="https://www.nydailynews.com/wp-content/uploads/migration/2023/03/29/BJ3EAJ3CWJD3RI4H644ONXPFZE.jpg?w=1200"
        alt=""
      />

      <div class="bg-white/90 p-2 flex flex-col gap-2">
        <p class="text-sm">Currently wanted in the Hamilton area:</p>
        <p class="text-sm">
          Caucasian male, mid 30s, approximately 5'10 tall, thin build, dressed
          in a black hoodie, black pants, and a black mask.
        </p>
      </div>

      <div class="flex p-2 gap-2">
        <button
          on:click={dismiss}
          class="bg-white shadow text-sm font-bold px-4 py-1 w-full rounded-full"
        >
          DISMISS
        </button>

        <a
          class="bg-cyan-800 shadow text-sm text-white font-bold px-4 py-1 w-full text-center rounded-full"
          href="/"
        >
          MAP TO REPORT
        </a>
      </div>
    </div>
  </div>
{/if}
