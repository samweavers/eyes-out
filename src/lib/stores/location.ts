import { writable } from "svelte/store"

export const userLocation = writable(null)
// { latitude, longitude } or null

