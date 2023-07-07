<script lang="ts">
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';
	import RandomProjectCard from '$lib/components/RandomRepo/RandomRepo.svelte';

	export let data;

	const { stars, random } = data;
</script>

<a
	class="github-fork-ribbon"
	href="https://github.com/chrispinkney/starworthy"
	data-ribbon="Fork me on GitHub"
	title="Fork me on GitHub">Fork me on GitHub</a
>

<div class="container mx-auto">
	{#if stars && stars.length > 0}
		<RandomProjectCard {random} />
		<div class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Starred Repositories</h2>
			<ul class="space-y-4">
				{#each stars as star (star.id)}
					<RepoItem repo={star} />
				{/each}
			</ul>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
</style>
