export const URLBuilder = (
	language?: string | null,
	minStars?: number | null,
	contributors?: number | null,
	issues?: number | null,
	pullRequests?: number | null
): string => {
	const params = new URLSearchParams();

	if (language) params.append('language', language);
	if (minStars) params.append('stars', minStars.toString());
	if (contributors) params.append('contributors', contributors.toString());
	if (issues) params.append('issues', issues.toString());
	if (pullRequests) params.append('prs', pullRequests.toString());

	return `?${params.toString()}`;
};
