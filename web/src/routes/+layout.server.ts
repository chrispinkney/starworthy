import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';

const url: string | undefined = env.PUBLIC_API_URL;
let random: Repo;
let count: { count: number };
let username: { username: string };

export const load: LayoutServerLoad = async ({ fetch, depends }) => {
	try {
		const randomRepos = await fetch(url ? `${url}/random` : 'http://127.0.0.1:7000/random');
		random = await randomRepos.json();

		const reposCount = await fetch(url ? `${url}/count` : 'http://127.0.0.1:7000/count');
		count = await reposCount.json();

		const user = await fetch(url ? `${url}/user` : 'http://127.0.0.1:7000/user');
		username = await user.json();

		depends('random');

		return { random, count, username };
	} catch (e) {
		console.log(e);
	}
};
