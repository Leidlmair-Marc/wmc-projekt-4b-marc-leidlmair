<script>
    import { onMount } from 'svelte';
    import { translations } from '$lib/data/translations.js';

    let teams = $state([]);
    let language = $state('de');

    let t = $derived(translations[language]);

    async function loadTeams() {
        const user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(`http://localhost:3000/teams/${user.id}`);

        teams = await response.json();
    }

    async function deleteTeam(id) {
        if (!confirm(t.deleteTeamConfirm)) {
            return;
        }

        await fetch(`http://localhost:3000/teams/${id}`, {
            method: 'DELETE',
        });

        loadTeams();
    }

    async function renameTeam(team) {
        const newName = prompt(t.renameTeamPrompt, team.team_name);

        if (!newName) return;

        await fetch(`http://localhost:3000/teams/${team.id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                teamName: newName,
            }),
        });

        loadTeams();
    }

    function editTeam(team) {
        localStorage.setItem(
            'editTeam',
            JSON.stringify({
                id: team.id,
                team_name: team.team_name,
                characters: team.characters,
            }),
        );

        window.location.href = '/teamBuilder';
    }

    onMount(() => {

	const user = JSON.parse(localStorage.getItem('user'));

	language = user?.language ?? 'de';

	loadTeams();
});
</script>

<div class="page">
    <h1>{t.savedTeamsTitle}</h1>

    <p class="subtitle"> {t.manageTeams} </p>

    <div class="teams">
        {#if teams.length === 0}
            <div class="empty"> {t.noSavedTeams} </div>
        {/if}

        {#each teams as team}
            <div class="team-card">
                <div class="team-info">
                    <h2>
                        {team.team_name}
                    </h2>

                    <div class="team-characters">
                        {#each team.characters as character}
                            <div class="character">
                                <img src={character.image} alt={character.name}/>

                                <span>{character.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="actions">
                    <button class="edit" onclick={() => editTeam(team)}> {t.editTeam} </button>
                    <button class="rename" onclick={() => renameTeam(team)}> {t.renameTeam} </button>
                    <button class="delete" onclick={() => deleteTeam(team.id)}> {t.deleteTeam} </button>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .page {
        padding: 30px;
        color: white;
    }

    h1 {
        margin-bottom: 5px;
    }

    .subtitle {
        color: #94a3b8;
        margin-bottom: 25px;
    }

    .teams {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .team-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .team-info h2 {
        margin: 0;
    }
    .team-characters {
        display: flex;
        gap: 15px;
        margin-top: 12px;
        flex-wrap: wrap;
    }

    .character {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .character img {
        width: 65px;
        height: 65px;
        object-fit: contain;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
    }

    .character span {
        margin-top: 5px;
        font-size: 12px;
        color: #cbd5e1;
        text-align: center;
    }

    .actions {
        display: flex;
        gap: 10px;
    }

    .actions button {
        border: none;
        padding: 10px 15px;
        border-radius: 12px;
        color: white;
        cursor: pointer;
        font-weight: bold;
    }

    .edit {
        background: #3b82f6;
    }

    .rename {
        background: #9333ea;
    }

    .delete {
        background: #ef4444;
    }

    .empty {
        padding: 30px;
        text-align: center;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.05);
        color: #94a3b8;
    }
</style>
