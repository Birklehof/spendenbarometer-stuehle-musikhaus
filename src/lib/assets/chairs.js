import { writable } from 'svelte/store';

export const chairValueStore = writable(0);     // cached value
export let loaded = false;                    // flag prevents re-fetching

export async function loadValue() {
    if (loaded) return;                       // already cached
    loaded = true;

    const res = await fetch('/api/chairs');
    const data = await res.json();

    chairValueStore.set(data.chairs);
}


export async function updateValue(newValue) {
    await fetch('/api/chairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chairs: newValue })
    });
    chairValueStore.set(newValue);
}