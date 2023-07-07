<script lang="ts">
	import '@fontsource/open-sans';

	import Banner from '$lib/components/Banner/Banner.svelte';
	import '../app.css';
</script>

<Banner />

<slot />

<style>
	:global(body) {
		font-family: 'Open Sans Variable', sans-serif;
	}
</style>
