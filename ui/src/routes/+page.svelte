<script lang="ts">
	import { onMount } from 'svelte';

	let users: User[] = [];

	onMount(async () => {
		const response = await fetch('http://localhost:7000');
		users = await response.json();
	});
</script>

<h1>Users</h1>

<ul>
	{#each users as user}
		<li>{user.email}</li>
	{/each}
</ul>
