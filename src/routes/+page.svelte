<script>
	import { onMount } from 'svelte';
	import { chairValueStore, loadValue } from '$lib/assets/chairs.js';

	let containerWidth = 1510; // original design width
	let targetWidth = 1000; // actual width you want

	onMount(() => {
		loadValue();
	});

	// User sets number of tiles to fill
	let n = 200;

	chairValueStore.subscribe((value) => {
		n = 200;
		// n = value;
	});

	const leftRowPattern = [13, 13, 16, 16, 14, 13, 12, 9];
	const leftColOffsets = [4, 2.5, -0.5, -2.5, -5, -7.5, -7.5, -6.5];

	const rightRowPattern = [14, 14, 16, 14, 10, 10, 8];
	const rightColOffsets = [3.5, 2, 1, 0, -1, -2, -3];

	const leftRowOffsets = [-45, -20, -14, -35, -4, -30, 10, 0];
	const rightRowOffsets = [-45, -15, -20, -10, -24, 0, 0];

	const width = 210;
	const margin = (105 / 144) * width;
	const height = (40 / 144) * width;

	// Create a flat list of tiles with unique IDs
	const chairsLeft = [];
	const chairsRight = [];
	let id = 0;

	for (let row = 0; row < leftRowPattern.length; row++) {
		const count = leftRowPattern[row];
		for (let col = 0; col < count; col++) {
			chairsLeft.push({ id, row, col });
			id++;
		}
	}

	for (let row = 0; row < rightRowPattern.length; row++) {
		const count = rightRowPattern[row];
		for (let col = 0; col < count; col++) {
			chairsRight.push({ id, row, col });
			id++;
		}
	}

	// Helper: get tiles belonging to a specific row
	function chairsInLeftRows(rowIndex) {
		return chairsLeft.filter((t) => t.row === rowIndex);
	}

	function chairsInRightRows(rowIndex) {
		return chairsRight.filter((t) => t.row === rowIndex);
	}
</script>

<div
	bind:clientWidth={targetWidth}
	style="position: relative; width: 100%; transform-origin: top left; transform: scale({targetWidth / containerWidth});"
>
	<img
		src="/bg.png"
		alt="Stage"
		class="fixed top-0 left-0 max-h-none w-[1510px] max-w-none overflow-hidden"
	/>

	<div class="absolute top-[300px] left-[200px] flex h-full flex-col justify-items-start">
		{#each leftRowPattern as _, rowIndex}
			<div
				class="relative flex flex-row"
				style="margin-bottom: {leftRowOffsets[rowIndex]}px;
      margin-left: {(leftColOffsets[rowIndex] * (width - margin)) / 2}px;"
			>
				{#each chairsInLeftRows(rowIndex) as tile}
					<div
						class="relative"
						style="
            margin-left: -{(margin / 2) * 0.87 ** (leftRowPattern.length - 1 - rowIndex)}px;
            margin-right: -{(margin / 2) * 0.87 ** (leftRowPattern.length - 1 - rowIndex)}px;
            width: {width * 0.87 ** (leftRowPattern.length - 1 - rowIndex)}px;
            height: {height * 0.97 ** (leftRowPattern.length - 1 - rowIndex)}px;
            transform-origin: center;
          "
					>
						<image
							src="/lehne.png"
							alt="Chair"
							class="absolute w-full {tile.id < n ? 'opacity-100' : 'opacity-0'}"
						/>
						<image
							src="/polster.png"
							alt="Chair"
							class="absolute {tile.id < n ? 'opacity-100' : 'opacity-0'}"
						/>
						<image
							src="/gestell.png"
							alt="Chair"
							class="absolute {tile.id < n ? 'opacity-100' : 'opacity-0'}"
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div class="absolute top-[300px] left-[800px] flex h-full flex-col justify-items-start">
		{#each rightRowPattern as _, rowIndex}
			<div
				class="relative flex flex-row"
				style="margin-bottom: {rightRowOffsets[rowIndex]}px;
      margin-left: {(rightColOffsets[rowIndex] * (width - margin)) / 2}px;"
			>
				{#each chairsInRightRows(rowIndex) as tile}
					<div
						class="relative"
						style="
						margin-top: {tile.col * 0.2}px;
            margin-left: -{(margin / 2) * 0.9 ** (rightRowPattern.length - 1 - rowIndex)}px;
            margin-right: -{(margin / 2) * 0.9 ** (rightRowPattern.length - 1 - rowIndex)}px;
            width: {width * 0.9 ** (rightRowPattern.length - 1 - rowIndex)}px;
            height: {height * 0.97 ** (rightRowPattern.length - 1 - rowIndex)}px;
            transform-origin: center;
          "
					>
						<image
							src="/lehne.png"
							alt="Chair"
							class="absolute w-full {tile.id < n ? 'opacity-100' : 'opacity-0'}"
						/>
						<image
							src="/polster.png"
							alt="Chair"
							class="absolute {tile.id < n ? 'opacity-100' : 'opacity-0'}"
						/>
						<image
							src="/gestell.png"
							alt="Chair"
							class="absolute {tile.id < n ? 'opacity-100' : 'opacity-0'}"
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
