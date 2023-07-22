<script lang="ts">
	import { env } from '$env/dynamic/public';
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';
	import { URLBuilder } from '$lib/utils/urlbuilder';

	export let language: null | string;
	export let minStars: null | number;
	export let contributors: null | number;
	export let issues: null | number;
	export let pullRequests: null | number;

	const url = env.PUBLIC_API_URL;

	let repos: Promise<Repo[]>;
	let timer: NodeJS.Timeout;

	const getFilteredRepos = async (
		language?: null | string,
		minStars?: null | number,
		contributors?: null | number,
		issues?: null | number,
		pullRequests?: null | number
	) => {
		const urlString = URLBuilder(language, minStars, contributors, issues, pullRequests);

		try {
			const res = await fetch(url ? `${url}/${urlString}` : `http://127.0.0.1:7000/${urlString}`);
			const filteredRepos = await res.json();

			return filteredRepos;
		} catch (e) {
			console.log(e);
		}
	};

	const debounce = (
		language: null | string,
		minStars: null | number,
		contributors: null | number,
		issues: null | number,
		pullRequests: null | number
	) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			repos = getFilteredRepos(language, minStars, contributors, issues, pullRequests);
		}, 750);
	};

	$: debounce(language, minStars, contributors, issues, pullRequests);
</script>

<h2 class="text-2xl font-bold mb-4">Filtered Repositories</h2>
<ul class="space-y-4">
	{#await repos}
		<p>Loading...</p>
	{:then repos}
		{#if repos?.length > 0}
			{#each repos as repo (repo.id)}
				<RepoItem {repo} />
			{/each}
		{:else if repos}
			<p>No filtered results found</p>
		{/if}
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
</ul>

<style>
	.error {
		color: tomato;
	}
</style>
