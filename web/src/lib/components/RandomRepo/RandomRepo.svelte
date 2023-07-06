<script lang="ts">
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';

	export let random: Repo;
</script>

<div class="mb-8">
	<h2 class="text-2xl font-bold mb-4">Random Repository</h2>
	<ul class="space-y-4">
		<RepoItem repo={random} />
	</ul>
</div>

<style>
</style>
