<script>
	import CharacterCard from '$lib/components/CharacterCard.svelte';
	import { characters } from '$lib/data/characters.js';
</script>

<div class="page">
	<h1>Charaktere</h1>

	<div class="grid">
		{#each characters as character}
			<CharacterCard {character} />
		{/each}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #0b1020;
		color: white;
	}

	.page {
		padding: 40px;
	}

	h1 {
		font-size: 42px;
		margin-bottom: 30px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 25px;
	}

	@media (max-width: 600px) {
		.page {
			padding: 20px;
		}

		h1 {
			font-size: 32px;
		}
	}
</style>