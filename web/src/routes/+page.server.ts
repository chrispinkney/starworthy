import { env } from '$env/dynamic/public';

export async function load({ fetch }): Promise<{ stars: Repo[]; random: Repo } | undefined> {
	const url = env.PUBLIC_API_URL;

	try {
		const repos = await fetch(url || 'http://127.0.0.1:7000');
		const stars: Repo[] = await repos.json();
		const randomRepos = await fetch(url ? `${url}/random` : 'http://127.0.0.1:7000/random');
		const random: Repo = await randomRepos.json();

		return {
			stars,
			random
		};
	} catch (e) {
		console.log(e);
	}
}
