import { 
    getMovieById, 
    deleteMovie, 
    updateMovie 
} from "$lib/models/movie.js";

import { json } from "@sveltejs/kit";


// GET ONE MOVIE
export async function GET({ params }) {
    const id = params.id;
    const res = await getMovieById(id);
    return json(res);
}


// DELETE MOVIE
export async function DELETE({ params }) {
    const id = params.id;

    const res = await deleteMovie(id);
    return json(res);
}


// UPDATE MOVIE
export async function PUT({ params, request }) {
    const data = await request.json();

    const id = params.id;

    const {
        title,
        duration,
        director,
        synopsis,
        release_date,
        image_url,
        rating   // 👈 NEW
    } = data;

    const res = await updateMovie(
        id,
        title,
        duration,
        director,
        synopsis,
        release_date,
        image_url,
        rating   // 👈 NEW
    );

    return json(res);
}