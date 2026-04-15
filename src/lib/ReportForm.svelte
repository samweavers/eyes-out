<script>
  import { onMount } from "svelte"
  import { browser } from "$app/environment"
  import { userLocation } from "$lib/stores/location"
  import { crimes } from "$lib/stores/crimes"

  let name = ""
  // let email = ""
  let phone = ""
  let type = ""
  let date = ""
  let time = ""
  let description = ""
  let photos = []
  let photoPreviews = []
  let submitted = false

  if (window) {
    const params = new URLSearchParams(window.location.search)
    type = params.get("crime") ?? ""
  }

  // Auto-populate current date and time
  const now = new Date()
  date = now.toISOString().split("T")[0]
  time = now.toTimeString().slice(0, 5)

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    files.forEach((file) => {
      photos = [...photos, file]
      const reader = new FileReader()
      reader.onload = (ev) =>
        (photoPreviews = [
          ...photoPreviews,
          { src: ev.target.result, name: file.name },
        ])
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index) => {
    photos = photos.filter((_, i) => i !== index)
    photoPreviews = photoPreviews.filter((_, i) => i !== index)
    if (photos.length === 0) {
      const input = document.getElementById("photo")
      if (input) input.value = ""
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = {
      name,
      // email,
      phone,
      type,
      date,
      time,
      description,
      photos,
    }
    console.log("Crime report submitted:", formData)
    submitted = true
    setTimeout(() => {
      submitted = false
      name = ""
      // email = ""
      phone = ""
      type = ""
      date = ""
      time = ""
      description = ""
      photos = []
      photoPreviews = []
    }, 3000)
  }

  let locationMapContainer
  let locationMap
  let typeSelect

  onMount(async () => {
    if (type === "other" && typeSelect) {
      typeSelect.focus()
      try {
        typeSelect.showPicker()
      } catch (_) {
        // showPicker() requires a user gesture in most browsers — focus is the fallback
      }
    }

    if (!browser || !$userLocation) return

    const L = await import("leaflet")
    await import("leaflet/dist/leaflet.css")

    const { latitude, longitude } = $userLocation

    locationMap = L.map(locationMapContainer, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView([latitude, longitude], 16)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(locationMap)

    L.marker([latitude, longitude]).addTo(locationMap)

    return () => locationMap?.remove()
  })
</script>

<div
  class="min-h-screen bg-slate-100 flex items-start justify-center py-8 px-4"
>
  <div class="w-full max-w-md">
    <!-- Header -->
    <div
      class="bg-[#1b2a4a] rounded-2xl px-6 py-5 mb-4 flex items-center gap-4 shadow-lg"
    >
      <div class="bg-white/10 rounded-xl p-2.5">
        <svg
          class="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
      <h1 class="text-white text-xl font-bold leading-tight">
        Report: {type}
      </h1>
    </div>

    <!-- Form card -->
    <div class="bg-white rounded-2xl shadow-md overflow-hidden">
      <form on:submit={handleSubmit} class="divide-y divide-slate-100">
        <!-- Reporter Info -->
        <div class="px-5 py-5 space-y-4">
          <p
            class="text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            Your Info
          </p>

          <div>
            <label
              for="name"
              class="block text-sm font-medium text-slate-600 mb-1"
              >Full Name</label
            >
            <input
              id="name"
              bind:value={name}
              type="text"
              required
              placeholder="John Doe"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition"
            />
          </div>

          <div class="grid gap-3">
            <!-- <div>
              <label
                for="email"
                class="block text-sm font-medium text-slate-600 mb-1"
                >Email</label
              >
              <input
                id="email"
                bind:value={email}
                type="email"
                placeholder="john@example.com"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition"
              />
            </div> -->
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-slate-600 mb-1"
                >Phone</label
              >
              <input
                id="phone"
                bind:value={phone}
                type="tel"
                placeholder="(123) 456-7890"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition"
              />
            </div>
          </div>
        </div>

        <!-- Incident Details -->
        <div class="px-5 py-5 space-y-4">
          <p
            class="text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            Incident Details
          </p>

          <div>
            <label
              for="type"
              class="block text-sm font-medium text-slate-600 mb-1">Type</label
            >
            <select
              id="type"
              bind:value={type}
              bind:this={typeSelect}
              required
              class="w-full bg-slate-50 border-2 rounded-xl px-4 py-2.5 text-sm text-slate-800
         focus:outline-none focus:ring-4 focus:ring-blue-400/60 focus:border-blue-400 focus:bg-white
         transition appearance-none {type === 'other'
                ? 'border-[#1b2a4a] ring-2 ring-[#1b2a4a]/30 animate-pulse'
                : 'border-slate-200'}"
            >
              <option value="">Select...</option>
              {#each crimes as crime}
                <option value={crime.value}>{crime.label}</option>
              {/each}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label
                for="date"
                class="block text-sm font-medium text-slate-600 mb-1"
                >Date</label
              >
              <input
                id="date"
                bind:value={date}
                type="date"
                required
                class="w-full text-center bg-slate-50 border border-slate-200 rounded-xl py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition"
              />
            </div>
            <div>
              <label
                for="time"
                class="block text-sm font-medium text-slate-600 mb-1"
                >Time</label
              >
              <input
                id="time"
                bind:value={time}
                type="time"
                required
                class="w-full text-center bg-slate-50 border border-slate-200 rounded-xl py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition"
              />
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-slate-600 mb-1"
              >Description</label
            >
            <textarea
              id="description"
              bind:value={description}
              rows="4"
              placeholder="Provide as much detail as possible..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Photo Evidence -->
        <div class="px-5 py-5 space-y-3">
          <p
            class="text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            Photo Evidence
          </p>

          <!-- Previews grid -->
          {#if photoPreviews.length > 0}
            <div class="grid grid-cols-3 gap-2">
              {#each photoPreviews as preview, i}
                <div
                  class="relative rounded-xl overflow-hidden border border-slate-200 aspect-square"
                >
                  <img
                    src={preview.src}
                    alt="Preview {i + 1}"
                    class="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    on:click={() => removePhoto(i)}
                    class="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center transition"
                    aria-label="Remove photo"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              {/each}

              <!-- Add more tile -->
              <label
                for="photo"
                class="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl aspect-square bg-slate-50 hover:border-[#1b2a4a] hover:bg-slate-100 cursor-pointer transition"
              >
                <svg
                  class="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span class="text-xs text-slate-400 mt-1">Add more</span>
              </label>
            </div>
            <p class="text-xs text-slate-400">
              {photos.length} photo{photos.length !== 1 ? "s" : ""} selected
            </p>
          {:else}
            <!-- Empty state upload area -->
            <label
              for="photo"
              class="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-slate-200 rounded-xl py-7 bg-slate-50 hover:border-[#1b2a4a] hover:bg-slate-100 cursor-pointer transition"
            >
              <div class="bg-[#1b2a4a]/10 rounded-full p-3">
                <svg
                  class="w-6 h-6 text-[#1b2a4a]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <span class="text-sm font-medium text-[#1b2a4a]"
                >Take photo or upload</span
              >
              <span class="text-xs text-slate-400"
                >Camera or camera roll — select multiple</span
              >
            </label>
          {/if}

          <!-- Single hidden input used by both labels -->
          <input
            id="photo"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            on:change={handlePhotoChange}
          />
        </div>

        <!-- Incident Location -->
        <div class="px-5 py-5 space-y-3">
          <p
            class="text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            Incident Location
          </p>

          {#if $userLocation}
            <div
              class="rounded-xl overflow-hidden border border-slate-200 h-44"
              bind:this={locationMapContainer}
            ></div>
            <p class="text-xs text-slate-400">
              {$userLocation.latitude.toFixed(5)}, {$userLocation.longitude.toFixed(
                5,
              )}
            </p>
          {:else}
            <div
              class="flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl py-7 text-sm text-slate-400"
            >
              Location unavailable
            </div>
          {/if}
        </div>

        <!-- Submit -->
        <div class="px-5 py-5">
          {#if submitted}
            <div
              class="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-600 rounded-xl py-3 text-sm font-medium"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Report submitted successfully
            </div>
          {:else}
            <div class="flex flex-col gap-2">
              <button
                type="submit"
                class="w-full bg-[#1b2a4a] active:scale-[0.99] text-white font-semibold text-sm py-3 rounded-xl transition shadow-sm"
              >
                Submit Report
              </button>

<button
  type="button"
  on:click={() => history.back()}
  class="text-center w-full bg-red-600 active:scale-[0.99] text-white font-semibold text-sm py-3 rounded-xl transition shadow-sm"
>
  Abandon Report
</button>

            </div>
          {/if}
        </div>
      </form>
    </div>

    <p class="text-center text-xs text-slate-400 mt-4">
      All reports are kept confidential
    </p>
  </div>
</div>
