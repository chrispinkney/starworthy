<script lang="ts">
	export let repo: Repo;
</script>

<li class="border border-gray-300 rounded px-4 py-4 flex justify-between">
	<div class="flex-1">
		<div>
			<h3 class="text-lg font-semibold">{repo.name}</h3>
			<p>{repo.description || 'Project has no description'}</p>
			<a href={repo.url} target="_blank" rel="noopener noreferrer" class="text-blue-600"
				>{repo.url}</a
			>
		</div>
	</div>
	<div class="flex flex-col items-end text-gray-700">
		<div class="flex items-center space-x-2">
			<span class="text-sm">📚Language:</span>
			<span class="text-sm font-bold">{repo.language || 'Unknown'}</span>
		</div>
		<div class="flex items-center space-x-2">
			<span class="text-sm">❗Issues:</span>
			<span class="text-sm font-bold">{repo.issues}</span>
		</div>
		<div class="flex items-center space-x-2">
			<span class="text-sm">🌟Stars:</span>
			<span class="text-sm font-bold">{repo.stars}</span>
		</div>
	</div>
</li>
