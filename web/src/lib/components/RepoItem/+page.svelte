<script lang="ts">
	export let star;
</script>

<li class="border border-gray-300 rounded px-4 py-4 flex justify-between">
	<div class="flex-1">
		<div>
			<h3 class="text-lg font-semibold">{star.name}</h3>
			<p>{star.description || 'Project has no description'}</p>
			<a href={star.url} target="_blank" rel="noopener noreferrer" class="text-blue-600"
				>{star.url}</a
			>
		</div>
	</div>
	<div class="flex flex-col items-end text-gray-700">
		<div class="flex items-center space-x-2">
			<span class="text-sm">📚Language:</span>
			<span class="text-sm font-bold">{star.language || 'Unknown'}</span>
		</div>
		<div class="flex items-center space-x-2">
			<span class="text-sm">❗Issues:</span>
			<span class="text-sm font-bold">{star.issues}</span>
		</div>
		<div class="flex items-center space-x-2">
			<span class="text-sm">🌟Stars:</span>
			<span class="text-sm font-bold">{star.stars}</span>
		</div>
	</div>
</li>
