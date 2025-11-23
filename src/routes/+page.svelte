<script lang="ts">
	import { onMount } from 'svelte';
	import { chairValueStore, loadValue } from '$lib/assets/chairs';

	let containerWidth = 1510;
	let targetWidth: number | undefined;

	onMount(async () => {
		await loadValue();
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

	const chairsLeft: { id: number; row: number; col: number }[] = [];
	const chairsRight: { id: number; row: number; col: number }[] = [];
	let id =
		leftRowPattern.reduce((a, b) => a + b, 0) + rightRowPattern.reduce((a, b) => a + b, 0) - 1;

	for (let row = 0; row < Math.max(leftRowPattern.length, rightRowPattern.length); row++) {
		if (row < leftRowPattern.length) {
			const count = leftRowPattern[row];
			for (let col = 0; col < count; col++) {
				chairsLeft.push({ id, row, col });
				id--;
			}
		}
		if (row < rightRowPattern.length) {
			const count = rightRowPattern[row];
			for (let col = 0; col < count; col++) {
				chairsRight.push({ id, row, col });
				id--;
			}
		}
	}

	function chairsInLeftRows(rowIndex: number) {
		return chairsLeft.filter((t) => t.row === rowIndex);
	}

	function chairsInRightRows(rowIndex: number) {
		return chairsRight.filter((t) => t.row === rowIndex);
	}
</script>

<div
	bind:clientWidth={targetWidth}
	style="position: relative; width: 100%; transform-origin: top left; visibility: {targetWidth
		? 'visible'
		: 'hidden'}; transform: scale({targetWidth ? targetWidth / containerWidth : 1});"
>
	<img
		src="/bg.png"
		alt="Stage"
		class="fixed top-0 left-0 max-h-none w-[1510px] max-w-none overflow-hidden rounded-md"
	/>

	<div class="absolute top-[300px] left-[200px] flex h-full flex-col justify-items-start">
		{#each leftRowPattern as _, rowIndex}
			<div
				class="relative flex flex-row"
				style="margin-bottom: {leftRowOffsets[rowIndex]}px;
      margin-left: {(leftColOffsets[rowIndex] * (width - margin)) / 2}px;"
			>
				{#each chairsInLeftRows(rowIndex) as chair}
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
						<img
							src="/lehne.png"
							alt="Chair"
							class="absolute w-full {chair.id < $chairValueStore ? 'opacity-100' : 'opacity-0'}"
						/>
						<img
							src="/polster.png"
							alt="Chair"
							class="absolute {chair.id < $chairValueStore ? 'opacity-100' : 'opacity-0'}"
						/>
						<img
							src="/gestell.png"
							alt="Chair"
							class="absolute {chair.id < $chairValueStore ? 'opacity-100' : 'opacity-0'}"
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
				{#each chairsInRightRows(rowIndex) as chair}
					<div
						class="relative"
						style="
						margin-top: {chair.col * 0.2}px;
            margin-left: -{(margin / 2) * 0.9 ** (rightRowPattern.length - 1 - rowIndex)}px;
            margin-right: -{(margin / 2) * 0.9 ** (rightRowPattern.length - 1 - rowIndex)}px;
            width: {width * 0.9 ** (rightRowPattern.length - 1 - rowIndex)}px;
            height: {height * 0.97 ** (rightRowPattern.length - 1 - rowIndex)}px;
            transform-origin: center;
          "
					>
						<img
							src="/lehne.png"
							alt="Chair"
							class="absolute w-full {chair.id < $chairValueStore ? 'opacity-100' : 'opacity-0'}"
						/>
						<img
							src="/polster.png"
							alt="Chair"
							class="absolute {chair.id < $chairValueStore ? 'opacity-100' : 'opacity-0'}"
						/>
						<img
							src="/gestell.png"
							alt="Chair"
							class="absolute {chair.id < $chairValueStore ? 'opacity-100' : 'opacity-0'}"
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<p class="relative top-[720px] left-[1292px] text-black w-fit z-20 text-2xl">
		&copy; 2025 Paul Maier
	</p>
</div>
