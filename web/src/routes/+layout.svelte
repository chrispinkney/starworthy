<script lang="ts">
	import type { LayoutData } from './$types';
	import { invalidate } from '$app/navigation';
	import { RefreshCcwIcon } from 'svelte-feather-icons';
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';
	import Banner from '$lib/components/Banner/Banner.svelte';
	import '@fontsource/open-sans';
	import '../app.css';

	export let data: LayoutData;
	$: ({ random, username, count } = data);

	const rerunLoadFunction = () => {
		invalidate('random');
	};
</script>

<Banner />

<!-- User information -->
{#if username && count}
	<div class="container mx-auto mb-2">
		<div class="flex">
			<h1 class="text-3xl font-bold mt-4">
				<span class="text-orange">{username?.username}</span> has
				<span class="text-orange">{count?.count}</span> starred repos
			</h1>
		</div>
	</div>
{/if}

<!-- Random Repo -->
{#if random}
	<div class="container mx-auto mb-8">
		<div class="flex">
			<h2 class="text-2xl font-bold mb-4">Random Repository</h2>
			<button class="h-4 ml-2 mt-2" on:click={rerunLoadFunction}
				><RefreshCcwIcon size="18" /></button
			>
		</div>
		<RepoItem repo={random} />
	</div>
{/if}

<!-- Main Repo Content -->
<slot />

<style>
	:global(body) {
		font-family: 'Open Sans Variable', sans-serif;
	}
</style>
