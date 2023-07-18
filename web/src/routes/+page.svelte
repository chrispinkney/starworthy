<script lang="ts">
	import StarredRepo from '$lib/components/StarredRepo/StarredRepo.svelte';
	import FilteredRepos from '$lib/components/FilteredRepos/FilteredRepos.svelte';

	export let data;

	const { stars, allLanguages } = data;

	let language = '';
</script>

<!-- Main Content -->
<div class="container mx-auto">
	<!-- Languages Select -->
	{#if allLanguages}
		<select
			class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			bind:value={language}
		>
			<option value="">Select Language</option>
			{#each allLanguages as languageItem}
				<option value={languageItem}>{languageItem}</option>
			{/each}
		</select>
	{/if}

	<!-- All starred repos / filtered repos -->
	{#if stars && stars.length > 0}
		<div class="mb-8">
			{#if language === ''}
				<StarredRepo repos={stars} />
			{:else}
				{#key language}
					<FilteredRepos {language} />
				{/key}
			{/if}
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
</style>
