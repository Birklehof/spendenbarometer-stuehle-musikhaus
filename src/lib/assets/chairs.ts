import { writable } from 'svelte/store';

export const chairValueStore = writable(0);

export async function loadValue() {
    const res = await fetch('/api/chairs');
    const data = await res.json();

    chairValueStore.set(data);
}

export async function updateValue(newValue: number, passphrase: string) {
    await fetch('/api/chairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chairs: newValue, passphrase })
    }).then(async (res) => {
        if (!res.ok) {
            throw new Error('Fehler beim Aktualisieren');
        }
        chairValueStore.set(newValue);
    }).catch((_) => {
        throw new Error('Fehler beim Aktualisieren');
    });
}