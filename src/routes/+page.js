const posterFallbacks = [
	'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=600&fit=crop'
];

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

function getYear(releaseDate) {
	if (!releaseDate) {
		return '';
	}

	const date = new Date(releaseDate);
	return Number.isNaN(date.getTime()) ? String(releaseDate).slice(0, 4) : date.getFullYear();
}

function normalizeMovie(movie, index, relations) {
	const relation = relations.find((item) => item.movie === movie.title);

	return {
		id: movie.id,
		title: movie.title,
		subtitle: movie.synopsis || 'Disponible en Dinamic Movies',
		year: getYear(movie.release_date),
		rating: movie.rating || movie.popularity_score || '',
		genre: movie.genre || relation?.category || '',
		duration: movie.duration || '',
		poster: movie.poster || movie.poster_url || movie.image_url || posterFallbacks[index % posterFallbacks.length],
		backdrop:
			movie.backdrop ||
			movie.backdrop_url ||
			movie.poster ||
			movie.poster_url ||
			posterFallbacks[index % posterFallbacks.length]
	};
}

function normalizeCelebrity(celebrity, index, celebrityMovies) {
	const credits = celebrityMovies
		.filter((item) => item.celebrity === celebrity.name)
		.map((item) => item.role)
		.filter(Boolean);

	return {
		id: celebrity.id,
		name: celebrity.name,
		knownFor: credits.length > 0 ? [...new Set(credits)].join(' · ') : celebrity.role || 'Celebridad',
		photo:
			celebrity.photo ||
			celebrity.photo_url ||
			celebrity.image_url ||
			avatarFallbacks[index % avatarFallbacks.length],
		trending: Number(celebrity.popularity_score || 0) >= 90 || index < 4
	};
}

export async function load({ fetch }) {
	const [moviesResponse, categoriesResponse, celebritiesResponse, movieCategoriesResponse, celebrityMoviesResponse] =
		await Promise.all([
			fetchApi(fetch, '/api/movie'),
			fetchApi(fetch, '/api/category'),
			fetchApi(fetch, '/api/celebrities'),
			fetchApi(fetch, '/api/movie_category'),
			fetchApi(fetch, '/api/celebritymovie')
		]);

	const movies = moviesResponse.map((movie, index) => normalizeMovie(movie, index, movieCategoriesResponse));
	const celebrities = celebritiesResponse.map((celebrity, index) =>
		normalizeCelebrity(celebrity, index, celebrityMoviesResponse)
	);

	const categories = categoriesResponse.map((category) => {
		const categoryMovies = movieCategoriesResponse
			.filter((item) => item.category === category.name)
			.map((item) => movies.find((movie) => movie.title === item.movie))
			.filter(Boolean);

		return {
			id: category.id,
			name: category.name,
			movies: categoryMovies
		};
	});

	return {
		featuredMovies: movies.slice(0, 3),
		recommendedMovies: movies.slice(0, 8),
		categories,
		celebrities: celebrities.slice(0, 8)
	};
}
