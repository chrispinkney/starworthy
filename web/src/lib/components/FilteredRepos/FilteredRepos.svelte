<script lang="ts">
	import { env } from '$env/dynamic/public';
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';

	export let language: null | string;
	export let contributors: null | number;
	export let issues: null | number;

	const url = env.PUBLIC_API_URL;

	let repos: Promise<Repo[]>;
	let timer: NodeJS.Timeout;

	const getFilteredRepos = async (
		language: null | string,
		contributors: null | number,
		issues: null | number
	) => {
		const languageStr = `language=${language}`;
		const contributorsStr = `contributors=${contributors}`;
		const issuesStr = `issues=${issues}`;

		let urlString = '?';

		if (language) urlString += `${languageStr}&`;
		if (contributors) urlString += `${contributorsStr}&`;
		if (issues) urlString += `${issuesStr}&`;

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
		contributors: null | number,
		issues: null | number
	) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			repos = getFilteredRepos(language, contributors, issues);
		}, 750);
	};

	$: debounce(language, contributors, issues);
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
