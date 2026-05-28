<script>
	let { character, remove } = $props();
</script>

<div class="slot">
	<img src={character.image} alt={character.name}/>

	<h3>{character.name}</h3>

	<button onclick={() => remove(character.id)}>✕</button>
</div>