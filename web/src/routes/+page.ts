export async function load({ fetch }) {
	try {
		const res = await fetch('http://localhost:7000/v1/users');
		const stars: Star = await res.json();

		return {
			stars
		};
	} catch (e) {
		console.log(e);
	}
}
