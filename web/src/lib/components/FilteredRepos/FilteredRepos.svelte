<script lang="ts">
	import { env } from '$env/dynamic/public';
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';

	export let language: string;

	const url = env.PUBLIC_API_URL;

	const fetchLanguages = async () => {
		try {
			const res = await fetch(
				url ? `${url}?language=${language}` : `http://127.0.0.1:7000/?language=${language}`
			);
			const languages = await res.json();

			return languages;
		} catch (e) {
			console.log(e);
		}
	};

	let promise = fetchLanguages();
</script>

<h2 class="text-2xl font-bold mb-4">Filtered Repositories by {language}</h2>
<ul class="space-y-4">
	{#await promise}
		<p>Searching...</p>
	{:then repos}
		{#each repos as repo (repo.id)}
			<RepoItem {repo} />
		{/each}
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
</ul>

<style>
	.error {
		color: tomato;
	}
</style>
