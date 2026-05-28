<script>
	import { characters } from '$lib/data/characters.js';

	let team = $state([]);

	function addCharacter(character) {
		if (team.length >= 4) return;

		if (
			team.some(
				(member) => member.id === character.id
			)
		)
			return;

		team.push(character);
	}

	function removeCharacter(id) {
		team = team.filter(
			(member) => member.id !== id
		);
	}

	let roles = $derived.by(() => {
		let result = [];

		for (const character of team) {
			if (
				character &&
				!result.includes(character.role)
			) {
				result.push(character.role);
			}
		}

		return result;
	});

	let reactions = $derived.by(() => {
		const elements = team.map(
			(character) => character.element
		);

		let result = [];

		if (
			elements.includes('Pyro') &&
			elements.includes('Hydro')
		) {
			result.push('Vaporisieren');
		}

		if (
			elements.includes('Pyro') &&
			elements.includes('Cryo')
		) {
			result.push('Schmelzen');
		}

		if (
			elements.includes('Hydro') &&
			elements.includes('Electro')
		) {
			result.push('Elektrogeladen');
		}

		if (
			elements.includes('Dendro') &&
			elements.includes('Hydro')
		) {
			result.push('Blühen');
		}

		if (
			elements.includes('Dendro') &&
			elements.includes('Electro')
		) {
			result.push('Ausbreitung');
		}

		return result;
	});
</script>

<div class="page">

	<div class="team-panel">

		<h1>Team Builder</h1>

		<div class="team-header">
			<span>{team.length}/4</span>
		</div>

		<div class="team-grid">

			{#each [0,1,2,3] as index}

				{#if team[index]}

					<div class="slot">

						<img
							src={team[index].image}
							alt={team[index].name}
						/>

						<h3>
							{team[index].name}
						</h3>

						<button
							onclick={() =>
								removeCharacter(
									team[index].id
								)}
						>
							✕
						</button>

					</div>

				{:else}

					<div class="empty-slot">
						+
					</div>

				{/if}

			{/each}

		</div>

		<div class="section">

			<h2>Team Rollen</h2>

			<div class="badges">

				{#each roles as role}

					<span>
						{role}
					</span>

				{/each}

			</div>

		</div>

		<div class="section">

			<h2>Team Reaktionen</h2>

			<div class="badges">

				{#each reactions as reaction}

					<span>
						{reaction}
					</span>

				{/each}

			</div>

		</div>

	</div>

	<div class="character-list">

		<h2>
			Charaktere hinzufügen
		</h2>

		<div class="characters">

			{#each characters as character}

<button
	class="character"
	onclick={() => addCharacter(character)}
>
	<img
		src={character.image}
		alt={character.name}
	/>
</button>

			{/each}

		</div>

	</div>

</div>

<style>
	.page {
		padding: 30px;
		color: white;
	}

	.team-panel {
		background: rgba(20, 20, 40, 0.9);

		padding: 25px;

		border-radius: 20px;

		margin-bottom: 25px;
	}

	.team-header {
		text-align: right;

		margin-bottom: 20px;
	}

	.team-grid {
		display: grid;

		grid-template-columns:
			repeat(4, 1fr);

		gap: 15px;

		margin-bottom: 25px;
	}

	.slot {
		background: rgba(255,255,255,0.05);

		border-radius: 16px;

		padding: 10px;

		text-align: center;

		position: relative;
	}

	.slot img {
		width: 100%;
		height: 130px;

		object-fit: contain;
	}

	.slot button {
		position: absolute;

		top: 10px;
		right: 10px;

		background: red;

		border: none;

		color: white;

		border-radius: 50%;

		width: 25px;
		height: 25px;

		cursor: pointer;
	}

	.empty-slot {
		height: 220px;

		border: 2px dashed rgba(255,255,255,0.2);

		border-radius: 16px;

		display: flex;

		align-items: center;
		justify-content: center;

		font-size: 40px;

		color: rgba(255,255,255,0.3);
	}

	.section {
		margin-top: 20px;
	}

	.badges {
		display: flex;

		gap: 10px;

		flex-wrap: wrap;
	}

	.badges span {
		background: #9333ea;

		padding: 10px 15px;

		border-radius: 999px;
	}

	.character-list {
		background: rgba(20,20,40,0.9);

		padding: 25px;

		border-radius: 20px;
	}

	.characters {
		display: grid;

		grid-template-columns:
			repeat(auto-fill,minmax(90px,1fr));

		gap: 10px;
	}

	.character {
	cursor: pointer;
	border: none;
	padding: 0;
	background: rgba(255,255,255,0.05);
	border-radius: 12px;
	overflow: hidden;
	transition: 0.2s;
}

	.character:hover {
		transform: scale(1.05);
	}

	.character img {
		width: 100%;
		height: 90px;

		object-fit: contain;
	}
</style>