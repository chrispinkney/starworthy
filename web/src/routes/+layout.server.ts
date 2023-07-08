import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';

const url: string | undefined = env.PUBLIC_API_URL;
let random: Repo;

export const load: LayoutServerLoad = async ({ fetch, depends }) => {
	try {
		const randomRepos = await fetch(url ? `${url}/random` : 'http://127.0.0.1:7000/random');
		random = await randomRepos.json();

		depends('random');

		return { random };
	} catch (e) {
		console.log(e);
	}
};
