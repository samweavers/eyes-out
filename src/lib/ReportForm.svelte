<script>
  let name = ""
  let email = ""
  let phone = ""
  let type = ""
  let date = ""
  let description = ""
  let photo = null
  let photoPreview = null
  let submitted = false

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    photo = file
    const reader = new FileReader()
    reader.onload = (ev) => (photoPreview = ev.target.result)
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    photo = null
    photoPreview = null
    const input = document.getElementById("photo")
    if (input) input.value = ""
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = { name, email, phone, type, date, description, photo }
    console.log("Crime report submitted:", formData)
    submitted = true
    setTimeout(() => {
      submitted = false
      name = ""
      email = ""
      phone = ""
      type = ""
      date = ""
      description = ""
      photo = null
      photoPreview = null
    }, 3000)
  }
</script>

<!-- Outer page bg matches the light map feel of Eyes Out -->
<div
  class="min-h-screen bg-slate-100 flex items-start justify-center py-8 px-4"
>
  <div class="w-full max-w-md">
    <!-- Header — navy bar matching the app's branding -->
    <div
      class="bg-[#1b2a4a] rounded-2xl px-6 py-5 mb-4 flex items-center gap-4 shadow-lg"
    >
      <div class="bg-white/10 rounded-xl p-2.5">
        <svg
          class="w-7 h-7 text-white"
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
      <div>
        <p class="text-white/60 text-xs font-medium tracking-widest uppercase">
          Eyes Out
        </p>
        <h1 class="text-white text-xl font-bold leading-tight">
          Report an Incident
        </h1>
      </div>
    </div>

    <!-- Form card — white rounded card like the app's bottom sheet / nav -->
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

          <div class="grid grid-cols-2 gap-3">
            <div>
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
            </div>
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

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label
                for="type"
                class="block text-sm font-medium text-slate-600 mb-1"
                >Type</label
              >
              <select
                id="type"
                bind:value={type}
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition appearance-none"
              >
                <option value="">Select...</option>
                <option value="encampment">Encampment</option>
                <option value="drug_activity">Drug Activity</option>
                <option value="suspicious">Suspicious</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="other">Other</option>
              </select>
            </div>
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
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] transition"
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

          {#if photoPreview}
            <div
              class="relative rounded-xl overflow-hidden border border-slate-200"
            >
              <img
                src={photoPreview}
                alt="Preview"
                class="w-full max-h-48 object-cover"
              />
              <button
                type="button"
                on:click={removePhoto}
                class="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full transition"
              >
                Remove
              </button>
              <p
                class="text-xs text-slate-400 px-3 py-2 bg-slate-50 border-t border-slate-200 truncate"
              >
                {photo?.name}
              </p>
            </div>
          {:else}
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
              <span class="text-xs text-slate-400">Camera or camera roll</span>
              <input
                id="photo"
                type="file"
                accept="image/*"
                capture="environment"
                class="hidden"
                on:change={handlePhotoChange}
              />
            </label>
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
              <a
                href="/"
                class="text-center w-full bg-red-600 active:scale-[0.99] text-white font-semibold text-sm py-3 rounded-xl transition shadow-sm"
              >
                Abandon Report
              </a>
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
