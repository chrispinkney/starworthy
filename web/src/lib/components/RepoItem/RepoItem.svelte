<script lang="ts">
	export let repo: Repo;
</script>

<li class="border border-gray-300 rounded px-4 py-4 flex justify-between">
	<div class="flex-1">
		<div>
			<h3 class="text-lg font-bold">
				<a
					class="visited:text-orange underline"
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer">{repo.name}</a
				>
			</h3>
			<p>{repo.description || 'Project has no description'}</p>
		</div>
	</div>
	<div class="flex flex-col items-end text-gray-700">
		<div class="flex items-center space-x-2">
			<span class="text-sm">🌟Stars:</span>
			<span class="text-sm font-bold"
				>{new Intl.NumberFormat('en-US', {
					maximumSignificantDigits: 3,
					notation: 'compact'
				}).format(repo.stars)}</span
			>
		</div>

		<div class="flex items-center space-x-2">
			<span class="text-sm">❗Issues:</span>
			<span class="text-sm font-bold"
				>{new Intl.NumberFormat('en-US', {
					maximumSignificantDigits: 3,
					notation: 'compact'
				}).format(repo.issues)}</span
			>
		</div>

		{#if repo.language}
			<div class="flex items-center space-x-2">
				<span class="text-sm">📚Language:</span>
				<span class="text-sm font-bold">{repo.language}</span>
			</div>
		{/if}

		<div class="flex items-center space-x-2">
			<span class="text-sm">📅Created At:</span>
			<span class="text-sm font-bold"
				>{new Date(repo.created_at).toLocaleDateString('en-CA', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})}</span
			>
		</div>
	</div>
</li>

<style>
</style>
