<script lang="ts">
	export let data;
	const {stars} = data;
</script>

<h1>Stars</h1>
<ul> 
	{#each stars as star} 
		<li>{star.name}</li>
		<li>{@html star.description ? star.description : '<i>Project Has No Description</i>'}</li>
		<li><a href={star.url}>Link</a></li> 
		<hr/>
	{/each}
</ul>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.zinc.200);
	}

	hr {
		background-color: red;
		border-top: 2px dashed #8c8b8b;
	}
</style>
