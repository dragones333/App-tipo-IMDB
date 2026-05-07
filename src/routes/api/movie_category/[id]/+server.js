import { 
    getMovieCategoryById,
    updateMovieCategory,
    deleteMovieCategory
} from "$lib/models/movie_category";

import { json } from "@sveltejs/kit";

// GET
export async function GET({ params }) {
    const id = params.id;
    const res = await getMovieCategoryById(id);
    return json(res);
}

// DELETE
export async function DELETE({ params }) {
    const id = params.id;
    const res = await deleteMovieCategory(id);
    return json(res);
}

export async function PUT({ params, request }) {
    const data = await request.json();
    const id = params.id;
    const res = await updateMovieCategory(id, data.movie_id, data.category_id);
    return json(res);
}