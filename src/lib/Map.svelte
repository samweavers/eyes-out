<script>
  import { onMount } from "svelte"
  import { browser } from "$app/environment"
  import { TriangleAlert, X } from "lucide-svelte"
  import { reportColors } from "$lib/stores/reportColors"
  import { reports } from "$lib/stores/reports"

  let mapContainer
  let map
  let L

  let error = null

  let youMarker = null
  let placeMarker = null

  function removeMarker() {
    map.removeLayer(placeMarker)
    placeMarker = false
  }

  function setLocation() {
    if (!("geolocation" in navigator)) {
      error = "Geolocation not supported"
      return
    }

    // First: grab a quick cached position to center map immediately
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        map.setView([latitude, longitude], 17)
        if (youMarker) map.removeLayer(youMarker)
        youMarker = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: "you-marker",
            html: "",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
        }).addTo(map)
      },
      (err) => (error = err.message),
      {
        enableHighAccuracy: false, // fast, uses cached/wifi/cell
        timeout: 3000,
        maximumAge: 60000, // accept a position up to 1 min old
      },
    )

    // Then: refine with high accuracy GPS in the background
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        map.setView([latitude, longitude], 17)
        if (youMarker) map.removeLayer(youMarker)
        youMarker = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: "you-marker",
            html: "",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
        }).addTo(map)
      },
      () => {}, // silently fail, we already have a rough position
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }
  onMount(async () => {
    if (!browser) return

    L = await import("leaflet")
    await import("leaflet/dist/leaflet.css")

    // Fix marker icons lost during bundling
    const { default: iconUrl } = await import(
      "leaflet/dist/images/marker-icon.png"
    )
    const { default: iconRetinaUrl } = await import(
      "leaflet/dist/images/marker-icon-2x.png"
    )
    const { default: shadowUrl } = await import(
      "leaflet/dist/images/marker-shadow.png"
    )
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })

    map = L.map(mapContainer).setView([43.2557, -79.8711], 12)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)

    $reports.forEach((report) => {
      const color = reportColors[report.type] ?? reportColors.other
      const icon = L.divIcon({
        className: "report-marker",
        html: `<div class="report-pin" style="background:${color.bg}; "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })
      L.marker([report.lat, report.lng], { icon })
        .bindPopup(`<strong>${report.label}</strong>`)
        .addTo(map)
    })

    // Only ONE place marker allowed
    map.on("click", (e) => {
      const { lat, lng } = e.latlng
      if (placeMarker) map.removeLayer(placeMarker)
      placeMarker = L.marker([lat, lng]).addTo(map)
    })

    setLocation()

    return () => {
      if (map) map.remove()
    }
  })
</script>

<div class="map h-[100vh] absolute top-0">
  <!-- {#if error}
        <p class="error">{error}</p>
    {/if} -->

  {#if placeMarker}
    <div class="action-buttons">
      <a class="button icon-button report-button" href="/report">
        <TriangleAlert class="size-5" />
        REPORT
      </a>
      <button
        class="button danger-button icon-button"
        on:click={() => removeMarker()}
      >
        <X class="size-5" />
        CLEAR MARKER
      </button>
    </div>
  {/if}

  <div bind:this={mapContainer} class="map"></div>
</div>

<style>
  .map {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .error {
    color: red;
  }

  .action-buttons {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    width: max-content;
    bottom: 20vh;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  :global(.report-pin) {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.6);
  }

  :global(.report-marker) {
    background: none !important;
    border: none !important;
  }
</style>
