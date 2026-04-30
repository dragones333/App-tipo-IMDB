import { 
    createMovie, 
    getMovies 
} from "$lib/models/movie.js";

import { json } from "@sveltejs/kit";


// GET ALL MOVIES
export async function GET(){
    const res = await getMovies();
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