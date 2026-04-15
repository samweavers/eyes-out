<script>
  import { onMount } from "svelte"
  import { browser } from "$app/environment"
  import { TriangleAlert, X } from "lucide-svelte"
  import { reportColors } from "$lib/stores/reportColors"
  import { reports } from "$lib/stores/reports"
  import { userLocation } from "$lib/stores/location"
  import { page } from "$app/stores"
  import { get } from "svelte/store"

  let mapContainer
  let map
  let L

  let error = null

  let youMarker = null
  let placeMarker = null

  // ✅ Reactive route check
  $: isAdmin = $page.url.pathname === "/admin"

  function removeMarker() {
    if (placeMarker) map.removeLayer(placeMarker)
    placeMarker = null

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        userLocation.set({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => userLocation.set(null),
      { maximumAge: 60000 }
    )
  }

  function setLocation() {
    const admin = get(page).url.pathname === "/admin"

    if (!("geolocation" in navigator) || admin) return

    const updateLocation = (pos) => {
      const { latitude, longitude } = pos.coords
      userLocation.set({ latitude, longitude })

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
    }

    navigator.geolocation.getCurrentPosition(
      updateLocation,
      (err) => (error = err.message),
      {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 60000,
      }
    )

    navigator.geolocation.getCurrentPosition(updateLocation, () => {}, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    })
  }

  onMount(async () => {
    if (!browser) return

    L = await import("leaflet")
    await import("leaflet/dist/leaflet.css")

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

    // Add report markers
    $reports.forEach((report) => {
      const color = reportColors[report.type] ?? reportColors.other

      const icon = L.divIcon({
        className: "report-marker",
        html: `<div class="report-pin" style="background:${color.bg};"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      L.marker([report.lat, report.lng], { icon })
        .bindPopup(`<strong>${report.label}</strong>`)
        .addTo(map)
    })

    // ✅ Click handler (disabled on admin ONLY)
    map.on("click", (e) => {
      if (get(page).url.pathname === "/admin") return

      const { lat, lng } = e.latlng

      if (placeMarker) map.removeLayer(placeMarker)

      placeMarker = L.marker([lat, lng]).addTo(map)
      userLocation.set({ latitude: lat, longitude: lng })
    })

    setLocation()

    return () => {
      if (map) map.remove()
    }
  })
</script>

<div class="map h-[100vh] absolute top-0">
  {#if placeMarker}
    <div class="action-buttons">
      <a class="button icon-button report-button" href="/report">
        <TriangleAlert class="size-5" />
        REPORT
      </a>
      <button
        class="button danger-button icon-button"
        on:click={removeMarker}
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
