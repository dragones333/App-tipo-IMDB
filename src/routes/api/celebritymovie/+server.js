import { 
    createCelebrityMovie,
    getCelebrityMovies,
} from "$lib/models/celebrity_movie";

import { json } from "@sveltejs/kit";


// GET ALL
export async function GET(){
    const res = await getCelebrityMovies();
    return json(res);
}
// CREATE
export async function POST({ request }) {
    const data = await request.json();
    const res = await createCelebrityMovie(data.movie_id, data.celebrity_id, data.role);
    return json(res);
}
