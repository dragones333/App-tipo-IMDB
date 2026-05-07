import { error } from '@sveltejs/kit';

const avatarFallbacks = [
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&crop=face'
];

const posterFallbacks = [
	'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop',
	'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop'
];

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

function formatDate(dateValue) {
	if (!dateValue) {
		return '';
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return dateValue;
	}

	return new Intl.DateTimeFormat('es-MX', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

function getYear(releaseDate) {
	if (!releaseDate) {
		return '';
	}

	const date = new Date(releaseDate);
	return Number.isNaN(date.getTime()) ? String(releaseDate).slice(0, 4) : date.getFullYear();
}

function normalizeCelebrity(celebrity, index, credits) {
	const roles = credits.map((item) => item.role).filter(Boolean);

	return {
		id: celebrity.id,
		name: celebrity.name,
		dob: formatDate(celebrity.dob),
		bio: celebrity.bio || 'Esta celebridad todavia no tiene biografia registrada.',
		photo:
			celebrity.photo ||
			celebrity.photo_url ||
			celebrity.image_url ||
			avatarFallbacks[index % avatarFallbacks.length],
		knownFor: roles.length > 0 ? [...new Set(roles)].join(' | ') : celebrity.role || 'Celebridad',
		popularity: celebrity.popularity_score || ''
	};
}

function normalizeMovie(movie, index, credits) {
	const credit = credits.find((item) => item.movie === movie.title);

	return {
		id: movie.id,
		title: movie.title,
		poster: movie.poster || movie.poster_url || movie.image_url || posterFallbacks[index % posterFallbacks.length],
		genre: movie.genre || credit?.role || 'Participacion',
		year: getYear(movie.release_date),
		rating: movie.rating || movie.popularity_score || '',
		role: credit?.role || 'Participacion'
	};
}

export async function load({ fetch, params }) {
	const [celebrityResponse, creditsResponse, moviesResponse] = await Promise.all([
		fetchApi(fetch, `/api/celebrities/${params.id}`),
		fetchApi(fetch, '/api/celebritymovie'),
		fetchApi(fetch, `/api/movie?actor=${params.id}`)
	]);

	if (!celebrityResponse.success) {
		throw error(celebrityResponse.status || 404, celebrityResponse.message || 'Celebridad no encontrada');
	}

	const credits = (creditsResponse.success ? creditsResponse.data : []).filter(
		(item) => item.celebrity === celebrityResponse.data.name
	);
	const movies = (moviesResponse.success ? moviesResponse.data : []).map((movie, index) =>
		normalizeMovie(movie, index, credits)
	);
	const creditsWithMovieLinks = credits.map((credit) => ({
		...credit,
		movieId: movies.find((movie) => movie.title === credit.movie)?.id || null
	}));

	return {
		celebrity: normalizeCelebrity(celebrityResponse.data, Number(params.id) || 0, creditsWithMovieLinks),
		credits: creditsWithMovieLinks,
		movies
	};
}
