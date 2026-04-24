import {
    getCelebrityMovieById,
    updateCelebrityMovie,
    deleteCelebrityMovie
} from "$lib/models/celebrity_movie";

import { json } from "@sveltejs/kit";

// GET
export async function GET({ params }) {
    const id = params.id;
    const res = await getCelebrityMovieById(id);
    return json(res);
}

// DELETE
export async function DELETE({ params }) {
    const id = params.id;
    const res = await deleteCelebrityMovie(id);
    return json(res);
}

export async function PUT({ params, request }) {
    const data = await request.json();
    const id = params.id;
    const res = await updateCelebrityMovie(id, data.movie_id, data.celebrity_id, data.role);
    return json(res);
}
