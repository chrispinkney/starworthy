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
					<svg
						on:click={unstar}
						class="w-6 h-6 text-yellow-300"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 20"
					>
						<path
							d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
						/>
					</svg>
				{:else}
					<svg
						class="w-6 h-6 text-gray-300 dark:text-gray-500"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 20"
					>
						<path
							d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
						/>
					</svg>
				{/if}
				<a
					class="pl-1 visited:text-orange underline"
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer">{repo.owner}/{repo.name}</a
				>
				{#if isLoading}
					<svg
						class="loading ml-2 z-0"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><style>
							.spinner_9Mto {
								animation: spinner_5GqJ 1.6s linear infinite;
								animation-delay: -1.6s;
							}
							.spinner_bb12 {
								animation-delay: -1s;
							}
							@keyframes spinner_5GqJ {
								12.5% {
									x: 13px;
									y: 1px;
								}
								25% {
									x: 13px;
									y: 1px;
								}
								37.5% {
									x: 13px;
									y: 13px;
								}
								50% {
									x: 13px;
									y: 13px;
								}
								62.5% {
									x: 1px;
									y: 13px;
								}
								75% {
									x: 1px;
									y: 13px;
								}
								87.5% {
									x: 1px;
									y: 1px;
								}
							}
						</style><rect class="spinner_9Mto" x="1" y="1" rx="1" width="10" height="10" /><rect
							class="spinner_9Mto spinner_bb12"
							x="1"
							y="1"
							rx="1"
							width="10"
							height="10"
						/></svg
					>
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
</style>
