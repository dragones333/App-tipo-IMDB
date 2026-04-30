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

// {
//   "title": "Iron Man",
//   "duration": 126,
//   "director": "Jon Favreau",
//   "synopsis": "Tony Stark becomes a hero.",
//   "release_date": "2008-05-02",
//   "image_url": "https://example.com/ironman.jpg",
//   "rating": 8.0
// }

// {
//   "title": "Inception",
//   "duration": 148,
//   "director": "Christopher Nolan",
//   "synopsis": "Dream worlds collide.",
//   "release_date": "2010-07-16",
//   "image_url": "https://example.com/inception.jpg",
//   "rating": 8.8
// }

// {
//   "title": "The Matrix",
//   "duration": 136,
//   "director": "Wachowski Sisters",
//   "synopsis": "Reality is fake.",
//   "release_date": "1999-03-31",
//   "image_url": "https://example.com/matrix.jpg",
//   "rating": 8.7
// }

// {
//   "title": "Forrest Gump",
//   "duration": 142,
//   "director": "Robert Zemeckis",
//   "synopsis": "Life story of Forrest.",
//   "release_date": "1994-07-06",
//   "image_url": "https://example.com/forrest.jpg",
//   "rating": 8.8
// }

// {
//   "title": "Lucy",
//   "duration": 89,
//   "director": "Luc Besson",
//   "synopsis": "A woman gains powers.",
//   "release_date": "2014-07-25",
//   "image_url": "https://example.com/lucy.jpg",
//   "rating": 6.4
// }