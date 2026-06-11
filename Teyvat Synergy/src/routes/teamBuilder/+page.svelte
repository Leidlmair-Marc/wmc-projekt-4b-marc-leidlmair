<script>
	import { characters } from '$lib/data/characters.js';
	import { allReactions } from '$lib/data/reactions.js';
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import { translations } from '$lib/data/translations.js';

	const socket = io('http://localhost:3000');
	let team = $state([]);
	let teamName = $state('');
	let editingTeamId = $state(null);
	let language = $state('de');
	let t = $derived(translations[language]);

	onMount(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		language = user?.language ?? 'de';

		const savedTeam = localStorage.getItem('editTeam');

		if (savedTeam) {
			const loadedTeam = JSON.parse(savedTeam);

			team = loadedTeam.characters;

			teamName = loadedTeam.team_name;

			editingTeamId = loadedTeam.id;

			localStorage.removeItem('editTeam');
		}

		socket.on('teamUpdated', (newTeam) => {
			team = newTeam;
		});

		return () => {
			socket.off('teamUpdated');
		};
	});

	function addCharacter(character) {
		if (team.length >= 4) return;

		if (team.some((member) => member.id === character.id)) return;

		team.push(character);

		socket.emit('teamUpdated', team);
	}

	function removeCharacter(id) {
		team = team.filter((member) => member.id !== id);

		socket.emit('teamUpdated', team);
	}

	let roles = $derived.by(() => {
		let result = [];

		for (const character of team) {
			if (character && !result.includes(character.role)) {
				result.push(character.role);
			}
		}
		return result;
	});

	let reactions = $derived.by(() => {
		const elements = team.map((character) => character.element);

		const result = [];

		for (const reaction of allReactions) {
			if (reaction.elements) {
				const active = reaction.elements.every((element) =>
					elements.includes(element),
				);

				if (active) {
					result.push(reaction);
				}
			} else if (reaction.required) {
				const hasRequired = reaction.required.every((element) =>
					elements.includes(element),
				);

				if (!hasRequired) {
					continue;
				}

				if (reaction.oneOf) {
					const hasOneOf = reaction.oneOf.some((element) =>
						elements.includes(element),
					);

					if (!hasOneOf) {
						continue;
					}
				}
				result.push(reaction);
			}
		}

		// Lunar-Charged

		const hasLunarChargedCharacter = team.some(
			(character) =>
				character.name === 'Ineffa' ||
				character.name === 'Flins' ||
				character.name === 'Columbina',
		);

		if (
			elements.includes('Hydro') &&
			elements.includes('Electro') &&
			hasLunarChargedCharacter
		) {
			result.push({
				name: 'Lunar-Charged',
				description: t.lunarCharged,
			});
		}

		// Lunar-Bloom

		const hasLunarBloomCharacter = team.some(
			(character) =>
				character.name === 'Nefer' ||
				character.name === 'Lauma' ||
				character.name === 'Columbina',
		);

		if (
			elements.includes('Hydro') &&
			elements.includes('Dendro') &&
			hasLunarBloomCharacter
		) {
			result.push({
				name: 'Lunar-Bloom',
				description: t.lunarBloom,
			});
		}

		// Lunar-Crystallize

		const hasLunarCrystallizeCharacter = team.some(
			(character) =>
				character.name === 'Linnea' ||
				character.name === 'Zibai' ||
				character.name === 'Columbina',
		);

		if (
			elements.includes('Geo') &&
			elements.includes('Hydro') &&
			hasLunarCrystallizeCharacter
		) {
			result.push({
				name: 'Lunar-Crystallize',
				description: t.lunarCrystallize,
			});
		}
		return result;
	});

	async function saveTeam() {
		if (team.length !== 4) {
			alert(t.select4Characters);
			return;
		}

		if (!teamName.trim()) {
			alert(t.enterTeamName);
			return;
		}

		if (editingTeamId) {
			const response = await fetch(
				`http://localhost:3000/teams/${editingTeamId}/full`,
				{
					method: 'PUT',

					headers: { 'Content-Type': 'application/json' },

					body: JSON.stringify({
						teamName,

						characters: team.map((character) => character.id),
					}),
				},
			);

			const data = await response.json();

			editingTeamId = null;
		} else {
			const user = JSON.parse(localStorage.getItem('user'));

			const response = await fetch('http://localhost:3000/teams', {
				method: 'POST',

				headers: { 'Content-Type': 'application/json' },

				body: JSON.stringify({
					userId: user.id,
					teamName,
					characters: team.map((character) => character.id),
				}),
			});
			const data = await response.json();
		}
	}
</script>

<div class="page">
	<div class="team-panel">
		<h1>Team Builder</h1>

		<div class="save-team">
			<input type="text" bind:value={teamName} placeholder={t.teamName} />

			<button onclick={saveTeam}> {t.saveTeam} </button>
		</div>

		<div class="team-header">
			<span>{team.length}/4</span>
		</div>

		<div class="team-grid">
			{#each [0, 1, 2, 3] as index}
				{#if team[index]}
					<div class="slot">
						<img src={team[index].image} alt={team[index].name} />

						<h3>
							{team[index].name}
						</h3>

						<button onclick={() => removeCharacter(team[index].id)}>
							✕
						</button>
					</div>
				{:else}
					<div class="empty-slot">+</div>
				{/if}
			{/each}
		</div>

		<div class="section">
			<h2>{t.teamRoles}</h2>

			<div class="badges">
				{#each roles as role}
					<span>
						{role}
					</span>
				{/each}
			</div>
		</div>

		<div class="section">
			<h2>{t.teamReactions}</h2>

			<div class="badges">
				{#each reactions as reaction}
					<div class="reaction-card">
						<h4> {reaction.name[language]} </h4>

						<p> {reaction.description[language]} </p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="character-list">
		<h2>{t.addCharacter}</h2>

		<div class="characters">
			{#each characters as character}
				<button
					class="character"
					onclick={() => addCharacter(character)}
				>
					<img src={character.image} alt={character.name} />
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

	.save-team {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}

	.save-team input {
		flex: 1;
		padding: 12px;
		border-radius: 12px;
		border: none;
		background: rgba(255, 255, 255, 0.08);
		color: white;
	}

	.save-team button {
		padding: 12px 20px;
		border: none;
		border-radius: 12px;
		background: #9333ea;
		color: white;
		cursor: pointer;
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
		grid-template-columns: repeat(4, 1fr);
		gap: 15px;
		margin-bottom: 25px;
	}

	.slot {
		background: rgba(255, 255, 255, 0.05);
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
		border: 2px dashed rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40px;
		color: rgba(255, 255, 255, 0.3);
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
		background: rgba(20, 20, 40, 0.9);
		padding: 25px;
		border-radius: 20px;
	}

	.characters {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
		gap: 10px;
	}

	.character {
		cursor: pointer;
		border: none;
		padding: 0;
		background: rgba(255, 255, 255, 0.05);
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

	.reaction-card {
		background: rgba(255, 255, 255, 0.05);
		padding: 14px;
		border-radius: 14px;
		margin-bottom: 10px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.reaction-card h4 {
		margin: 0 0 6px;
		color: white;
	}

	.reaction-card p {
		margin: 0;
		font-size: 13px;
		color: #cbd5e1;
	}
</style>
