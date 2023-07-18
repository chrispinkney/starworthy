import { env } from '$env/dynamic/public';

export async function load({
	fetch
}): Promise<{ stars: Repo[]; allLanguages: string[] } | undefined> {
	const url = env.PUBLIC_API_URL;

	try {
		const repos = await fetch(url || 'http://127.0.0.1:7000');
		const stars: Repo[] = await repos.json();

		const languages = await fetch(url ? `${url}/languages` : 'http://127.0.0.1:7000/languages');
		const allLanguages: string[] = await languages.json();

		return {
			stars,
			allLanguages
		};
	} catch (e) {
		console.log(e);
	}
}
