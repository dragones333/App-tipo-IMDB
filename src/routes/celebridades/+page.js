const avatarFallbacks = [
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
];

async function fetchApi(fetch, path) {
	try {
		const response = await fetch(path);

		if (!response.ok) {
			return [];
		}

		const result = await response.json();
		return result.success ? result.data : [];
	} catch (error) {
		console.error(`Error cargando ${path}:`, error);
		return [];
	}
}

function normalizeCelebrity(celebrity, index, celebrityMovies) {
	const credits = celebrityMovies
		.filter((item) => item.celebrity === celebrity.name)
		.map((item) => item.role)
		.filter(Boolean);
	const movies = celebrityMovies
		.filter((item) => item.celebrity === celebrity.name)
		.map((item) => item.movie)
		.filter(Boolean);
	const roles = [...new Set(credits)];

	return {
		id: celebrity.id,
		name: celebrity.name,
		role: celebrity.role || roles[0] || 'Celebridad',
		roles,
		knownFor: roles.length > 0 ? roles.join(' | ') : celebrity.role || 'Celebridad',
		photo:
			celebrity.photo ||
			celebrity.photo_url ||
			celebrity.image_url ||
			avatarFallbacks[index % avatarFallbacks.length],
		bio: celebrity.bio || 'Sin biografia registrada.',
		popularity: Number(celebrity.popularity_score || 0),
		movieCount: [...new Set(movies)].length,
		trending: Number(celebrity.popularity_score || 0) >= 90 || index < 4
	};
}

export async function load({ fetch }) {
	const [celebritiesResponse, celebrityMoviesResponse] = await Promise.all([
		fetchApi(fetch, '/api/celebrities'),
		fetchApi(fetch, '/api/celebritymovie')
	]);

	return {
		celebrities: celebritiesResponse.map((celebrity, index) =>
			normalizeCelebrity(celebrity, index, celebrityMoviesResponse)
		)
	};
}
