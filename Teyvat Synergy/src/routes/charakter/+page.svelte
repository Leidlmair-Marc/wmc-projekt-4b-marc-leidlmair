<script>
	import CharacterCard from '$lib/components/CharacterCard.svelte';
	import { characters } from '$lib/data/characters.js';

	let search = $state('');
	let selectedElement = $state('Alle');

	const elements = [
		'Alle',
		'Pyro',
		'Hydro',
		'Electro',
		'Cryo',
		'Geo',
		'Dendro',
		'Anemo'
	];

	function getElementColor(element) {
	switch (element) {
		case 'Pyro':
			return '#ff5b3a';

		case 'Hydro':
			return '#3ea6ff';

		case 'Electro':
			return '#b15cff';

		case 'Cryo':
			return '#79e8ff';

		case 'Geo':
			return '#d6a44c';

		case 'Dendro':
			return '#7bc74d';

		case 'Anemo':
			return '#66e0c2';

		default:
			return 'rgba(255,255,255,0.08)';
	}
}

	let filteredCharacters = $derived(
		characters.filter((character) => {
			const matchesSearch =
				character.name
					.toLowerCase()
					.includes(search.toLowerCase());

			const matchesElement =
				selectedElement === 'Alle'
					? true
					: character.element === selectedElement;

			return matchesSearch && matchesElement;
		})
	);
</script>

<div class="layout">
	<div class="page">

		<div class="topbar">
			<h1>Charaktere</h1>

			<input
				type="text"
				placeholder="Nach Charakter suchen..."
				bind:value={search}
			/>
		</div>

		<div class="filters">
			{#each elements as element}
				<button
					class:selected={selectedElement === element}
					style={`background:${getElementColor(element)}`}
					onclick={() => selectedElement = element}
				>
					{element}
				</button>
			{/each}
		</div>

		<div class="grid">
			{#each filteredCharacters as character}
				<CharacterCard {character} />
			{/each}
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #151933;
		color: white;
	}

	.layout {
		display: flex;
		min-height: 100vh;
	}

	/* PAGE */

	.page {
		flex: 1;
		padding: 40px;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		margin-bottom: 25px;
	}

	h1 {
		margin: 0;
		font-size: 38px;
	}

	input {
		width: 320px;
		padding: 14px 18px;
		border-radius: 14px;
		border: 1px solid rgba(255,255,255,0.08);
		background: rgba(255,255,255,0.05);
		color: white;
		outline: none;
	}

	input:focus {
		border-color: #9333ea;
		box-shadow: 0 0 0 3px rgba(147,51,234,0.2);
	}

	/* FILTERS */

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 30px;
	}

	.filters button {
		padding: 10px 18px;
		border: none;
		border-radius: 999px;
		background: rgba(255,255,255,0.05);
		color: white;
		cursor: pointer;
		transition: 0.2s;
	}

	.filters button:hover {
		background: rgba(255,255,255,0.1);
	}

	.filters button.selected {
		font-weight: bold;
	}

	/* GRID */

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		gap: 22px;
	}

	/* MOBILE */

	@media (max-width: 900px) {

		.page {
			padding: 20px;
		}

		.topbar {
			flex-direction: column;
			align-items: stretch;
		}

		input {
			width: 100%;
		}
	}
</style>