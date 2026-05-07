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


// {
//   "movie_id": 6,
//   "celebrity_id": 5,
//   "role": "Tony Stark"
// }

// {
//   "movie_id": 7,
//   "celebrity_id": 7,
//   "role": "Cobb"
// }

// {
//   "movie_id": 8,
//   "celebrity_id": 9,
//   "role": "Neo"
// }

// {
//   "movie_id": 9,
//   "celebrity_id": 8,
//   "role": "Forrest Gump"
// }

// {
//   "movie_id": 10,
//   "celebrity_id": 6,
//   "role": "Lucy"
// }