<script>
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { translations } from '$lib/data/translations.js';

	let { children } = $props();
	let showNavbar = $derived(
		page.url.pathname !== '/' &&
		page.url.pathname !== '/register'
	);

	let language = 'de';
	const t = translations[language];
	if (typeof window !== 'undefined') {

		const user = JSON.parse(localStorage.getItem('user'));
		language = user?.language || 'de';
}
</script>

{#if showNavbar}
	<div class="navbar">
		<a href="/charakter">
			{t.characters}
		</a>

		<a href="/teamBuilder">
			{t.teamBuilder}
		</a>

		<a href="/savedTeams">
			{t.savedTeams}
		</a>

		<a href="/settings">
			{t.settings}
		</a>
	</div>
{/if}

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	.navbar {
		position: sticky;
		top: 0;

		height: 70px;

		display: flex;
		align-items: center;
		gap: 30px;

		padding: 0 40px;

		background:
			rgba(10, 12, 24, 0.95);

		backdrop-filter: blur(10px);

		border-bottom:
			1px solid rgba(255,255,255,0.08);

		z-index: 999;
	}

	.navbar a {
		color: white;
		text-decoration: none;

		font-weight: 600;

		transition: 0.2s;
	}

	.navbar a:hover {
		color: #c084fc;
	}
</style>