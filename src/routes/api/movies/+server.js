import { json } from '@sveltejs/kit';
import { searchMovies } from '$lib/models/movies.js';

export async function GET({ url }) {
    const q = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || 'all';
    const rating = Number(url.searchParams.get('rating')) || 0;

    const result = await searchMovies(q, category, rating);

    if (result.success) {
        return json(result.data);
    } else {
        return json({ error: result.message }, { status: 500 });
    }
}