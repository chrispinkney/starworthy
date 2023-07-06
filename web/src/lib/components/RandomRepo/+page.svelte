<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { env } from '$env/dynamic/public';

	import RepoItem from '$lib/components/RepoItem/+page.svelte';

	let random = null;

	const fetchrandom = async () => {
		try {
			let url;

			if (env.PUBLIC_API_URL === undefined) {
				url = 'http://127.0.0.1:7000/random';
			} else {
				url = `${env.PUBLIC_API_URL}/random`;
			}

			const res = await fetch(url);

			const project = await res.json();

			random = project;
		} catch (e) {
			console.error(e);
		}
	};

	onMount(() => {
		fetchrandom();
	});
</script>

{#if random}
	<div class="mb-8" transition:fade={{ duration: 1500 }}>
		<h2 class="text-2xl font-bold mb-4">Random Repository</h2>
		<ul class="space-y-4">
			<RepoItem star={random} key={random.id} />
		</ul>
	</div>
{/if}

<style>
</style>
