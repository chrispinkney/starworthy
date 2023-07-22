<script lang="ts">
	import StarredRepo from '$lib/components/StarredRepo/StarredRepo.svelte';
	import FilteredRepos from '$lib/components/FilteredRepos/FilteredRepos.svelte';

	export let data;
	$: ({ stars, allLanguages } = data);

	let language = '';
	let minStars: null | number = null;
	let contributors: null | number = null;
	let issues: null | number = null;
	let pullRequests: null | number = null;

	const clear = () => {
		language = '';
		minStars = null;
		contributors = null;
		issues = null;
		pullRequests = null;
	};
</script>

<!-- Main Content -->
<div class="container mx-auto">
	<!-- Languages Select -->
	{#if allLanguages}
		<select
			class="appearance-none w-1/6 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			bind:value={language}
		>
			<option value="">Select Language</option>
			{#each allLanguages as languageItem}
				<option value={languageItem}>{languageItem}</option>
			{/each}
		</select>
	{/if}

	<!-- Stars Input -->
	<input
		type="number"
		class="w-1/6 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		placeholder="Min. Number of Stars"
		bind:value={minStars}
	/>

	<!-- Contributors Input -->
	<input
		type="number"
		class="w-1/6 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		placeholder="Min. Number of Contributors"
		bind:value={contributors}
	/>

	<!-- Issues Input -->
	<input
		type="number"
		class="w-1/6 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		placeholder="Min. Number of Issues"
		bind:value={issues}
	/>

	<!-- Pull Requests Input -->
	<input
		type="number"
		class="w-1/6 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		placeholder="Min. Number of Pull Requests"
		bind:value={pullRequests}
	/>

	<!-- Clear button -->
	<button
		class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange border border-orange rounded-md shadow-sm hover:bg-red-600 w-12 h-9"
		data-rounded="rounded-md"
		data-primary="red-600"
		on:click|preventDefault={clear}
	>
		Clear
	</button>

	<!-- All starred repos / filtered repos -->
	{#if stars && stars.length > 0}
		<div class="mb-8">
			{#if language === '' && minStars === null && contributors === null && issues === null && pullRequests === null}
				<StarredRepo repos={stars} />
			{:else}
				<FilteredRepos {language} {minStars} {contributors} {issues} {pullRequests} />
			{/if}
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
</style>
