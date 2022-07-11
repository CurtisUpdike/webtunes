export default async function fetchAll(getFunc) {
	const limit = 100; // MusicKit API's limit
	let offset = 0;
	let data = [];
	while (data.length % limit === 0) {
		const response = await getFunc({ limit, offset });
		if (response.length === 0) break;
		data = data.concat(response);
		offset += limit;
	}
	return data;
}
