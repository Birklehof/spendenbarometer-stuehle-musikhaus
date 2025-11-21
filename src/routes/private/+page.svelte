<script>
    import { onMount } from 'svelte';
    import { chairValueStore, loadValue, updateValue } from '$lib/assets/chairs.js';
    import { get } from 'svelte/store';

    let inputValue = '';

    // Fetch initial value from server
    onMount(async () => {
        await loadValue();
        inputValue = get(chairValueStore);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateValue(inputValue);
        alert('Aktualisiert!');
    };
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-semibold mb-4 text-gray-800">Aktualisiere Stuhlanzahl</h1>

    <form class="flex flex-col gap-4" on:submit={handleSubmit}>
        <input
            type="number"
            bind:value={inputValue}
            placeholder="Neuer Wert"
            required
            class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
            Speichern
        </button>
    </form>

    <p class="mt-4 text-gray-700">
        Aktueller Wert: <span class="font-medium text-gray-900">{$chairValueStore}</span>
    </p>
</div>
