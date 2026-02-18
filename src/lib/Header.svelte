<script lang="ts">
  import { Search } from "lucide-svelte"

  const data = [
    { label: "Suspicious Activity", value: "suspicious" },
    { label: "Drug Activity", value: "drug-activity" },
    { label: "Encampment", value: "encampment" },
    { label: "Vandalism", value: "vandalism" },
    { label: "Theft", value: "theft" },
    { label: "Break-in", value: "break-in" },
    { label: "Trespassing", value: "trespassing" },
    { label: "Loitering", value: "loitering" },
    { label: "Noise Complaint", value: "noise" },
    { label: "Vehicle Break-in", value: "vehicle-break-in" },
    { label: "Package Theft", value: "package-theft" },
    { label: "Graffiti", value: "graffiti" },
    { label: "Public Intoxication", value: "intoxication" },
    { label: "Illegal Dumping", value: "dumping" },
    { label: "Harassment", value: "harassment" },
    { label: "Assault", value: "assault" },
    { label: "Burglary", value: "burglary" },
    { label: "Armed Robbery", value: "armed-robbery" },
    { label: "Hit and Run", value: "hit-and-run" },
    { label: "Other", value: "other" },
  ]

  let query = ""
  let open = false

  $: filtered = data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  )

  function select(item) {
    query = item.label
    open = false
  }
</script>

<header>
  <div class="header-inner">
    <!-- Logo -->
    <img src="/images/eyes-out-logo.png" alt="Eyes Out" class="logo" />

    <!-- Search -->
    <div class="search-wrapper">
      <div class="search-box big-shadow">
        <Search size={20} color="#888" />
        <input
          type="text"
          placeholder="Search or report an incident..."
          bind:value={query}
          on:focus={() => (open = true)}
        />
      </div>

      {#if open && filtered.length}
        <div class="dropdown">
          {#each filtered as item}
            <button on:click={() => select(item)}>
              {item.label}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 40;
    background: transparent;
    pointer-events: none;
    background: linear-gradient(
      to top,
      transparent,
      rgba(219, 234, 254, 0.75),
      rgba(147, 197, 253, 0.9)
    );
  }

  .header-inner {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1rem 1.25rem;
    pointer-events: none;
  }

  .logo {
    width: 260px;
    object-fit: contain;
    pointer-events: auto;
    /* soft drop shadow to lift it off the map */
    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.18));
  }

  .search-wrapper {
    width: 100%;
    position: relative;
    pointer-events: auto;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    border-radius: 9999px;
    padding: 0.85rem 1.25rem;
  }

  .search-box input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: #222;
  }

  .search-box input::placeholder {
    color: #aaa;
  }

  .dropdown {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    max-height: 240px;
    overflow-y: auto;
    z-index: 50;
  }

  .dropdown button {
    width: 100%;
    text-align: left;
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #222;
  }

  .dropdown button:hover {
    background: #f5f5f5;
  }
</style>
