<script>
	let { character } = $props();
</script>

<div class="card">
	<img src={character.image} alt={character.name} />

	<div class="info">
		<h2>{character.name}</h2>

		<div class="badges">
			<span class="element">
				{character.element}
			</span>

			<span class="role">
				{character.role}
			</span>
		</div>
	</div>
</div>

<style>
	.card {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		overflow: hidden;
		backdrop-filter: blur(10px);
		transition: 0.2s;
		cursor: pointer;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
	}

	img {
		width: 100%;
		height: 280px;
		object-fit: cover;
	}

	.info {
		padding: 18px;
		color: white;
	}

	h2 {
		margin: 0 0 12px;
		font-size: 22px;
	}

	.badges {
		display: flex;
		gap: 10px;
	}

	.badges span {
		padding: 6px 12px;
		border-radius: 999px;
		font-size: 13px;
		font-weight: bold;
	}

	.element {
		background: #9333ea;
	}

	.role {
		background: rgba(255, 255, 255, 0.1);
	}
</style>