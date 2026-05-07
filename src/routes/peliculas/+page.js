const posterFallbacks = [
	'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=600&fit=crop'
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

function getYear(releaseDate) {
	if (!releaseDate) {
		return '';
	}

	const date = new Date(releaseDate);
	return Number.isNaN(date.getTime()) ? String(releaseDate).slice(0, 4) : date.getFullYear();
}

function normalizeMovie(movie, index, relations) {
	const genres = relations
		.filter((item) => item.movie === movie.title)
		.map((item) => item.category)
		.filter(Boolean);

	const uniqueGenres = [...new Set(genres)];

	return {
		id: movie.id,
		title: movie.title,
		poster: movie.poster || movie.poster_url || movie.image_url || posterFallbacks[index % posterFallbacks.length],
		genres: uniqueGenres,
		genre: movie.genre || uniqueGenres.join(' · ') || 'Sin categoria',
		rating: Number(movie.rating || movie.popularity_score || 0),
		year: getYear(movie.release_date),
		duration: movie.duration || '',
		director: movie.director || '',
		synopsis: movie.synopsis || ''
	};
}

export async function load({ fetch }) {
	const [moviesResponse, movieCategoriesResponse] = await Promise.all([
		fetchApi(fetch, '/api/movie'),
		fetchApi(fetch, '/api/movie_category')
	]);

	return {
		movies: moviesResponse.map((movie, index) => normalizeMovie(movie, index, movieCategoriesResponse))
	};
}
