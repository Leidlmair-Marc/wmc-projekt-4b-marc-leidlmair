<script>
	let { character } = $props();

	function getElementColor(element) {
		switch (element) {
			case 'Pyro':
				return '#ff6b4a';

			case 'Hydro':
				return '#4da6ff';

			case 'Electro':
				return '#b56cff';

			case 'Cryo':
				return '#7ce7ff';

			case 'Geo':
				return '#d8b15a';

			case 'Dendro':
				return '#7bc74d';

			case 'Anemo':
				return '#66e0c2';

			default:
				return '#999';
		}
	}
</script>

<div class="card">
	<div class="image-wrapper">
		<img src={character.image} alt={character.name} />
	</div>

	<div class="content">
		<h2>{character.name}</h2>

		<div class="info">
			<span class="element" style={`background:${getElementColor(character.element)}`}>
				{character.element}
			</span>

			<span class="role">{character.role}</span>
		</div>

		<div class="stars"
			class:fiveStar={character.rarity === 5}
			class:fourStar={character.rarity === 4}>
			{'★'.repeat(character.rarity)}
		</div>
	</div>
</div>

<style>
	.card {
		background: rgba(15, 18, 35, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 20px;
		overflow: hidden;
		transition: 0.25s;
		cursor: pointer;
		backdrop-filter: blur(10px);
	}

	.card:hover {
		transform: translateY(-6px);
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(147, 51, 234, 0.25);
	}

	.image-wrapper {
		padding: 18px 18px 0;
	}

	img {
		width: 100%;
		height: 160px;
		object-fit: contain;
		border-radius: 14px;
		background: radial-gradient(
			circle at top,
			rgba(255, 255, 255, 0.08),
			rgba(255, 255, 255, 0.02)
		);
	}

	.content {
		padding: 16px;
		color: white;
	}

	h2 {
		margin: 0 0 12px;
		font-size: 18px;
		font-weight: 700;
	}

	.info {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 10px;
	}

	.element,
	.role {
		padding: 5px 10px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: bold;
	}

	.role {
		background: rgba(255, 255, 255, 0.08);
	}

	.stars {
		color: #ffd54a;
		font-size: 14px;
		letter-spacing: 2px;
	}
</style>