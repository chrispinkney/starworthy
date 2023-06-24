import { env } from '$env/dynamic/public';

export async function load({ fetch }) {
	try {
		console.log(env.PUBLIC_api_url);
		const res = await fetch(env.PUBLIC_api_url || 'http://localhost:7000/users');
		const stars: Star = await res.json();

		return {
			stars
		};
	} catch (e) {
		console.log(e);
	}
}
