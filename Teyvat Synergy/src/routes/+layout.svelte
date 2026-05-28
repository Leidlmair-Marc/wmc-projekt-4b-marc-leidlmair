<script>
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
	let showNavbar = $derived(
		page.url.pathname !== '/' &&
		page.url.pathname !== '/register'
	);
</script>

{#if showNavbar}
	<div class="navbar">
		<a href="/charakter">Charaktere</a>

		<a href="/teamBuilder">
			Team Builder
		</a>

		<a href="/charakter">
			Gespeicherte Teams
		</a>

		<a href="/charakter">
			Profil
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