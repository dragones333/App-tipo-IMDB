import { error } from '@sveltejs/kit';

const posterFallback =
	'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=900&fit=crop';

async function fetchApi(fetch, path) {
	try {
		const response = await fetch(path);

		if (!response.ok) {
			return { success: false, data: null, status: response.status };
		}

		return await response.json();
	} catch (err) {
		console.error(`Error cargando ${path}:`, err);
		return { success: false, data: null };
	}
}

function getYear(releaseDate) {
	if (!releaseDate) {
		return '';
	}

	const date = new Date(releaseDate);
	return Number.isNaN(date.getTime()) ? String(releaseDate).slice(0, 4) : date.getFullYear();
}

function formatDate(releaseDate) {
	if (!releaseDate) {
		return '';
	}

	const date = new Date(releaseDate);

	if (Number.isNaN(date.getTime())) {
		return releaseDate;
	}

	return new Intl.DateTimeFormat('es-MX', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

function normalizeMovie(movie, categoryRelations) {
	const categories = categoryRelations
		.filter((item) => item.movie === movie.title)
		.map((item) => item.category)
		.filter(Boolean);

	return {
		id: movie.id,
		title: movie.title,
		duration: movie.duration || '',
		director: movie.director || '',
		synopsis: movie.synopsis || 'Esta pelicula todavia no tiene sinopsis registrada.',
		releaseDate: formatDate(movie.release_date),
		year: getYear(movie.release_date),
		genres: [...new Set(categories)],
		poster: movie.poster || movie.poster_url || movie.image_url || posterFallback,
		backdrop: movie.backdrop || movie.backdrop_url || movie.poster || movie.poster_url || posterFallback
	};
}

export async function load({ fetch, params }) {
	const [movieResponse, movieCategoriesResponse, celebrityMoviesResponse] = await Promise.all([
		fetchApi(fetch, `/api/movie/${params.id}`),
		fetchApi(fetch, '/api/movie_category'),
		fetchApi(fetch, '/api/celebritymovie')
	]);

	if (!movieResponse.success) {
		throw error(movieResponse.status || 404, movieResponse.message || 'Pelicula no encontrada');
	}

	const movie = normalizeMovie(movieResponse.data, movieCategoriesResponse.success ? movieCategoriesResponse.data : []);
	const cast = (celebrityMoviesResponse.success ? celebrityMoviesResponse.data : [])
		.filter((item) => item.movie === movie.title)
		.map((item) => ({
			id: item.id,
			name: item.celebrity,
			role: item.role
		}));

	return {
		movie,
		cast
	};
}
