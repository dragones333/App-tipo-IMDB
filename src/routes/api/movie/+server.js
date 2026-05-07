
import { json } from "@sveltejs/kit";
import { getFilteredMovies, createMovie } from "$lib/models/movie.js";

export async function GET({ url }) {
    const rating = url.searchParams.get("rating") || null;
const category = url.searchParams.get("category") || null;
const actor = url.searchParams.get("actor") || null;

    const res = await getFilteredMovies({ rating, category, actor });
    return json(res);
}


// CREATE MOVIE
export async function POST({ request }){
    const data = await request.json();

    const res = await createMovie(
        data.title,
        data.duration,
        data.director,
        data.synopsis,
        data.release_date,
        data.image_url,
        data.rating   // 👈 NEW
    );

    return json(res);
}




// # BASE (no filters)
// http://localhost:5173/api/movie

// # RATING
// http://localhost:5173/api/movie?rating=8

// # CATEGORY
// http://localhost:5173/api/movie?category=1

// # ACTOR
// http://localhost:5173/api/movie?actor=5


// # COMBINATIONS

// # rating + category
// http://localhost:5173/api/movie?rating=8&category=1

// # rating + actor
// http://localhost:5173/api/movie?rating=8&actor=5

// # category + actor
// http://localhost:5173/api/movie?category=1&actor=5

// # ALL FILTERS
// http://localhost:5173/api/movie?rating=8&category=1&actor=5
