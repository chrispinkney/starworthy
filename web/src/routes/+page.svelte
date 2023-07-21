<script lang="ts">
	import StarredRepo from '$lib/components/StarredRepo/StarredRepo.svelte';
	import FilteredRepos from '$lib/components/FilteredRepos/FilteredRepos.svelte';

	export let data;
	$: ({ stars, allLanguages } = data);

	let contributors: null | number = null;
	let issues: null | number = null;
	let language = '';

	const clear = () => {
		language = '';
		contributors = null;
		issues = null;
	};
</script>

<!-- Main Content -->
<div class="container mx-auto">
	<!-- Languages Select -->
	{#if allLanguages}
		<select
			class="appearance-none w-3/12 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			bind:value={language}
		>
			<option value="">Select Language</option>
			{#each allLanguages as languageItem}
				<option value={languageItem}>{languageItem}</option>
			{/each}
		</select>
	{/if}

	<!-- Contributors Input -->
	<input
		type="number"
		class="w-3/12 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		placeholder="Min. Number of Contributors"
		bind:value={contributors}
	/>

	<!-- Issues Input -->
	<input
		type="number"
		class="w-3/12 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		placeholder="Min. Number of Issues"
		bind:value={issues}
	/>

	<button class="rounded-full" on:click|preventDefault={clear}>Clear</button>

	<!-- All starred repos / filtered repos -->
	{#if stars && stars.length > 0}
		<div class="mb-8">
			{#if language === '' && contributors === null && issues === null}
				<StarredRepo repos={stars} />
			{:else}
				<FilteredRepos {language} {contributors} {issues} />
			{/if}
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
</style>
