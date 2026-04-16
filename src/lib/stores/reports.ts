import { writable, derived } from "svelte/store"

export type Report = {
  lat: number
  lng: number
  type: string
  label: string
}
export const reports = writable<Report[]>([
  // --- West Hamilton / Westdale / Ainslie Wood ---
  { lat: 43.2635, lng: -79.9150, type: "encampment",  label: "Encampment", severity: "very-high" },
  { lat: 43.2582, lng: -79.9055, type: "suspicious",  label: "Suspicious Activity", severity: "moderate" },
  { lat: 43.2550, lng: -79.9200, type: "theft",       label: "Theft", severity: "high" },

  // --- Dundas ---
  { lat: 43.2660, lng: -79.9505, type: "drugs",       label: "Drug Activity", severity: "very-high" },
  { lat: 43.2730, lng: -79.9700, type: "vandalism",   label: "Vandalism", severity: "high" },
  { lat: 43.2605, lng: -79.9400, type: "noise",       label: "Noise Complaint", severity: "moderate" },

  // --- Ancaster ---
  { lat: 43.2185, lng: -79.9870, type: "suspicious",  label: "Suspicious Activity", severity: "moderate" },
  { lat: 43.2040, lng: -79.9850, type: "theft",       label: "Theft", severity: "high" },
  { lat: 43.2290, lng: -80.0000, type: "loitering",   label: "Loitering", severity: "moderate" },

  // --- Mount Hope ---
  { lat: 43.1600, lng: -79.9100, type: "encampment",  label: "Encampment", severity: "very-high" },
  { lat: 43.1505, lng: -79.9050, type: "drugs",       label: "Drug Activity", severity: "high" },

  // --- Binbrook ---
  { lat: 43.1250, lng: -79.8100, type: "suspicious",  label: "Suspicious Activity", severity: "moderate" },
  { lat: 43.1350, lng: -79.7950, type: "graffiti",    label: "Graffiti", severity: "moderate" },
  { lat: 43.1180, lng: -79.8250, type: "theft",       label: "Theft", severity: "high" },

  // --- Stoney Creek (Upper) ---
  { lat: 43.2160, lng: -79.7200, type: "vandalism",   label: "Vandalism", severity: "high" },
  { lat: 43.2300, lng: -79.7050, type: "suspicious",  label: "Suspicious Activity", severity: "moderate" },

  // --- Winona ---
  { lat: 43.2000, lng: -79.6600, type: "noise",       label: "Noise Complaint", severity: "moderate" },
  { lat: 43.2105, lng: -79.6750, type: "loitering",   label: "Loitering", severity: "moderate" },

  // --- Fruitland / Rural East Hamilton ---
  { lat: 43.1850, lng: -79.6300, type: "encampment",  label: "Encampment", severity: "very-high" },

  // --- Waterdown ---
  { lat: 43.3340, lng: -79.8950, type: "suspicious",  label: "Suspicious Activity", severity: "moderate" },
  { lat: 43.3450, lng: -79.8800, type: "drugs",       label: "Drug Activity", severity: "high" },
  { lat: 43.3200, lng: -79.9100, type: "theft",       label: "Theft", severity: "high" },

  // --- Carlisle ---
  { lat: 43.3980, lng: -79.9800, type: "vandalism",   label: "Vandalism", severity: "high" },

  // --- Greensville ---
  { lat: 43.2860, lng: -79.9950, type: "graffiti",    label: "Graffiti", severity: "moderate" },

  // --- Flamborough Rural ---
  { lat: 43.3600, lng: -80.0500, type: "loitering",   label: "Loitering", severity: "moderate" },

  // --- East End / Industrial Sector ---
  { lat: 43.2480, lng: -79.8200, type: "drugs",       label: "Drug Activity", severity: "very-high" },
  { lat: 43.2400, lng: -79.8000, type: "suspicious",  label: "Suspicious Activity", severity: "moderate" },

  // --- Central Mountain ---
  { lat: 43.2300, lng: -79.8800, type: "encampment",  label: "Encampment", severity: "very-high" },
  { lat: 43.2250, lng: -79.8700, type: "theft",       label: "Theft", severity: "high" },
])



export const encampments       = derived(reports, ($r) => $r.filter(r => r.type === "encampment"))
export const suspiciousReports = derived(reports, ($r) => $r.filter(r => r.type === "suspicious"))
export const drugReports       = derived(reports, ($r) => $r.filter(r => r.type === "drugs"))
export const reportTotal = derived(reports, ($r) => $r.length)

export const reportCounts = derived(reports, ($r) =>
  $r.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
)