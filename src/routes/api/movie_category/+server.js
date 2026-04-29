import { 
    createMovieCategory, 
    getMovieCategories,
    getMovieCategoryById,
    updateMovieCategory,
    deleteMovieCategory
} from "$lib/models/movie_category";

import { json } from "@sveltejs/kit";

// GET ALL
export async function GET({ url }) {
    const id = url.searchParams.get("id");

    if (id) {
        const res = await getMovieCategoryById(id);
        return json(res);
    }

    const res = await getMovieCategories();
    return json(res);
}


// ➕ CREATE
export async function POST({ request }) {
    const data = await request.json();

    const res = await createMovieCategory(
        data.movie_id,
        data.category_id
    );

    return json(res);
}
