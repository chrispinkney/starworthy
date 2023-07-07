<script lang="ts">
	import { RefreshCcwIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { env } from '$env/dynamic/public';
	import RepoItem from '$lib/components/RepoItem/RepoItem.svelte';

	const url = env.PUBLIC_API_URL;
	let random: Repo;

	onMount(() => {
		fetchRandom();
	});

	const fetchRandom = async () => {
		const randomRepos = await fetch(url ? `${url}/random` : 'http://127.0.0.1:7000/random');
		random = await randomRepos.json();
	};
</script>

{#if random}
	<div class="mb-8" transition:fade={{ duration: 1500 }}>
		<div class="flex">
			<h2 class="text-2xl font-bold mb-4">Random Repository</h2>
			<button class="h-4 ml-2 mt-2" on:click={fetchRandom}><RefreshCcwIcon size="18" /></button>
		</div>
		<RepoItem repo={random} />
	</div>
{/if}

<style>
</style>
