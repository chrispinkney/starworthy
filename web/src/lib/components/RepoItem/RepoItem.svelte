<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	export let repo: Repo;

	const url = env.PUBLIC_API_URL;

	let isLoading = false;

	const unstar = async () => {
		isLoading = true;

		const { owner, name } = repo;

		const deleteUrl = `delete?owner=${owner}&repo=${name}`;

		try {
			await fetch(url ? `${url}/${deleteUrl}` : `http://127.0.0.1:7000/${deleteUrl}`, {
				method: 'DELETE'
			});

			await invalidate('stars');
		} catch (e) {
			console.log(e);
		} finally {
			isLoading = false;
		}
	};
</script>

<li class="border border-gray-300 rounded px-4 py-4 flex justify-between">
	<div class="flex-1">
		<div>
			<h3 class="text-lg font-bold flex">
				{#if !isLoading}
					<img
						src="/star.svg"
						alt="star"
						class="w-6 h-6 star cursor-pointer"
						on:click={unstar}
						on:keyup
					/>
				{:else}
					<img src="/star.svg" alt="unstar" class="w-6 h-6 unstar cursor-progress" />
				{/if}
				<a
					class="pl-1 visited:text-orange underline"
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer">{repo.owner}/{repo.name}</a
				>
				{#if isLoading}
					<div
						class="loading ml-2 z-0 inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					>
						<span
							class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
							>Loading...</span
						>
					</div>
				{/if}
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
			<span class="text-sm">👥Contributors:</span>
			<span class="text-sm font-bold">{repo.contributors}</span>
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

		<div class="flex items-center space-x-2">
			<span class="text-sm"
				><img
					src="/pr.svg"
					width="14px"
					height="14px"
					alt="pull requests"
					class="logo mx-auto max-w-full h-auto inline"
				/>Pull Requests:</span
			>
			<span class="text-sm font-bold">{repo.pullRequests}</span>
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
	.loading {
		filter: invert(38%) sepia(28%) saturate(3641%) hue-rotate(340deg) brightness(101%) contrast(93%);
	}

	.star {
		filter: invert(89%) sepia(100%) saturate(574%) hue-rotate(330deg) brightness(102%) contrast(98%);
	}

	.unstar {
		filter: invert(47%) sepia(22%) saturate(246%) hue-rotate(182deg) brightness(88%) contrast(89%);
	}
</style>
