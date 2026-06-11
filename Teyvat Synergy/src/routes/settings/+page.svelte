<script>
	import { onMount } from 'svelte';
	import { translations } from '$lib/data/translations.js';

	let language = $state('de');
	let user = $state(null);
	let username = $derived(user?.username ?? '');
	let email = $derived(user?.email ?? '');
	let teamCount = $state(0);
	let favoriteElement = $state('-');
	let favoriteRole = $state('-');
	let t = $derived(translations[language]);

	onMount(async () => {
		const data = JSON.parse(localStorage.getItem('user'));

		user = data;
		language = data?.language ?? 'de';

		const statsResponse = await fetch(`http://localhost:3000/users/${data.id}/stats`);

		const stats = await statsResponse.json();

		teamCount = stats.teamCount;
		favoriteElement = stats.favoriteElement;
		favoriteRole = stats.favoriteRole;
	});

	async function saveLanguage() {
		console.log('Neue Sprache:', language);

		const response = await fetch(
			`http://localhost:3000/users/${user.id}/language`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					language,
				}),
			},
		);

		console.log('Status:', response.status);

		const data = await response.json();

		console.log(data);

		if (response.ok) {
			user.language = language;

			localStorage.setItem('user', JSON.stringify(user));

			location.reload();
		}
	}

	async function deleteAccount() {
		const confirmDelete = confirm(
			t.deleteAccountConfirm
		);

		if (!confirmDelete) return;

		const response = await fetch(`http://localhost:3000/users/${user.id}`, {
			method: 'DELETE',
		});

		const data = await response.json();

		if (response.ok) {
			localStorage.removeItem('user');

			window.location.href = '/';
		}
	}

	function logout() {
		localStorage.removeItem('user');

		window.location.href = '/';
	}
</script>

<div class="page">
	<h1> {t.settings} </h1>

	<div class="settings-grid">
		<div class="card">
			<h2> {t.account} </h2>

			<div class="info">
				<p> {t.username}: {username}
				</p>

				<p> {t.email}: {email} </p>
			</div>

			<button class="logout-btn" onclick={logout}> {t.logout} </button>

			<button class="danger-btn" onclick={deleteAccount}> {t.deleteAccount} </button>
		</div>

		<div class="card">
			<h2> {t.language} </h2>

			<p> {t.selectLanguage} </p>

			<select bind:value={language}>
				<option value="de"> {t.german} </option>

				<option value="en"> {t.english} </option>
			</select>

			<button class="save-btn" onclick={saveLanguage}> {t.save} </button>
		</div>

		<div class="card">
			<h2> {t.statistics} </h2>

			<div class="stats">
				<div>
					{t.savedTeamsCount}:
					<span>{teamCount}</span>
				</div>

				<div>
					{t.favoriteElement}:
					<span>{favoriteElement}</span>
				</div>

				<div>
					{t.mostUsedRole}:
					<span>{favoriteRole}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		padding: 30px;
		color: white;
	}

	h1 {
		margin-bottom: 25px;
		font-size: 38px;
	}

	.settings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 20px;
	}

	.card {
		background: rgba(20, 20, 40, 0.9);
		border-radius: 20px;
		padding: 25px;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.card h2 {
		margin-top: 0;
		margin-bottom: 15px;
		color: white;
	}

	.info p {
		color: #cbd5e1;
	}

	select {
		width: 100%;
		padding: 12px;
		border-radius: 12px;
		border: none;
		background: rgba(255, 255, 255, 0.08);
		color: white;
		margin-top: 10px;
		margin-bottom: 15px;
	}

	select option {
		background: rgb(20, 20, 40);
		color: white;
	}

	.save-btn {
		width: 100%;
		padding: 12px;
		border: none;
		border-radius: 12px;
		background: #9333ea;
		color: white;
		font-weight: bold;
		cursor: pointer;
	}

	.save-btn:hover {
		background: #a855f7;
	}

	.danger-btn {
		width: 100%;
		padding: 12px;
		border: none;
		border-radius: 12px;
		background: #ef4444;
		color: white;
		font-weight: bold;
		cursor: pointer;
		margin-top: 15px;
	}

	.danger-btn:hover {
		background: #dc2626;
	}

	.logout-btn {
		width: 100%;
		padding: 12px;
		border: none;
		border-radius: 12px;
		background: #3b82f6;
		color: white;
		font-weight: bold;
		cursor: pointer;
		margin-top: 10px;
	}

	.logout-btn:hover {
		background: #2563eb;
	}
	.stats {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.stats div {
		background: rgba(255, 255, 255, 0.05);
		padding: 12px;
		border-radius: 12px;
	}

	.stats span {
		float: right;
		color: #c084fc;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.settings-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
