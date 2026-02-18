import { writable, derived } from "svelte/store"

export type Report = {
  lat: number
  lng: number
  type: string
  label: string
}

export const reports = writable<Report[]>([
  // --- Downtown Hamilton Core (concentrated) ---
  { lat: 43.2571, lng: -79.8695, type: "encampment",  label: "Encampment" },
  { lat: 43.2558, lng: -79.8712, type: "encampment",  label: "Encampment" },
  { lat: 43.2545, lng: -79.8730, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2560, lng: -79.8660, type: "drugs",       label: "Drug Activity" },
  { lat: 43.2538, lng: -79.8695, type: "encampment",  label: "Encampment" },
  { lat: 43.2590, lng: -79.8720, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2575, lng: -79.8740, type: "drugs",       label: "Drug Activity" },
  { lat: 43.2562, lng: -79.8678, type: "theft",       label: "Theft" },
  { lat: 43.2548, lng: -79.8655, type: "vandalism",   label: "Vandalism" },
  { lat: 43.2533, lng: -79.8710, type: "loitering",   label: "Loitering" },
  { lat: 43.2580, lng: -79.8698, type: "noise",       label: "Noise Complaint" },
  { lat: 43.2567, lng: -79.8722, type: "graffiti",    label: "Graffiti" },
  { lat: 43.2554, lng: -79.8668, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2541, lng: -79.8735, type: "theft",       label: "Theft" },
  { lat: 43.2595, lng: -79.8645, type: "drugs",       label: "Drug Activity" },

  // --- Stoney Creek ---
  { lat: 43.2240, lng: -79.7580, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2195, lng: -79.7620, type: "theft",       label: "Theft" },
  { lat: 43.2268, lng: -79.7545, type: "vandalism",   label: "Vandalism" },
  { lat: 43.2210, lng: -79.7490, type: "encampment",  label: "Encampment" },
  { lat: 43.2252, lng: -79.7610, type: "drugs",       label: "Drug Activity" },
  { lat: 43.2180, lng: -79.7555, type: "loitering",   label: "Loitering" },
  { lat: 43.2275, lng: -79.7500, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2230, lng: -79.7640, type: "noise",       label: "Noise Complaint" },
  { lat: 43.2200, lng: -79.7520, type: "graffiti",    label: "Graffiti" },
  { lat: 43.2260, lng: -79.7570, type: "theft",       label: "Theft" },

  // --- Dundas ---
  { lat: 43.2668, lng: -79.9590, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2642, lng: -79.9620, type: "encampment",  label: "Encampment" },
  { lat: 43.2695, lng: -79.9555, type: "drugs",       label: "Drug Activity" },
  { lat: 43.2655, lng: -79.9640, type: "vandalism",   label: "Vandalism" },
  { lat: 43.2680, lng: -79.9510, type: "theft",       label: "Theft" },
  { lat: 43.2630, lng: -79.9580, type: "loitering",   label: "Loitering" },
  { lat: 43.2710, lng: -79.9600, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2648, lng: -79.9530, type: "noise",       label: "Noise Complaint" },

  // --- Hannon ---
  { lat: 43.1980, lng: -79.8120, type: "suspicious",  label: "Suspicious Activity" },
  { lat: 43.2010, lng: -79.8085, type: "theft",       label: "Theft" },
  { lat: 43.1955, lng: -79.8150, type: "vandalism",   label: "Vandalism" },
  { lat: 43.2035, lng: -79.8060, type: "encampment",  label: "Encampment" },
  { lat: 43.1970, lng: -79.8100, type: "drugs",       label: "Drug Activity" },
  { lat: 43.2020, lng: -79.8140, type: "loitering",   label: "Loitering" },
  { lat: 43.1990, lng: -79.8070, type: "graffiti",    label: "Graffiti" },
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