import { env } from '$env/dynamic/public';

export async function load({ fetch }) {
	try {
		const res = await fetch(env.PUBLIC_API_URL || 'http://127.0.0.1:7000');
		const stars: Star = await res.json();

		return {
			stars
		};
	} catch (e) {
		console.log(e);
	}
}
