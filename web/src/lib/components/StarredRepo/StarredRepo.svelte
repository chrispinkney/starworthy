<script lang="ts">
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';
	export let repos: Repo[];
</script>

<h2 class="text-2xl font-bold mb-4">Starred Repositories</h2>
<ul class="space-y-4">
	{#each repos as repo (repo.id)}
		<RepoItem {repo} />
	{/each}
</ul>

<style>
</style>
