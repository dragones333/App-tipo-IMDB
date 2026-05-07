import { 
    createCelebrity, 
    getCelebrities 
} from "$lib/models/celebrities";

import { json } from "@sveltejs/kit";


// GET ALL
export async function GET(){
    const res = await getCelebrities();
    return json(res);
}
// CREATE
export async function POST({ request }) {
    const data = await request.json();

    const res = await createCelebrity(
        data.name,
        data.dob,
        data.bio
    );

    return json(res);
}

// {
//   "name": "Robert Downey Jr.",
//   "dob": "1965-04-04",
//   "bio": "Known for Iron Man.",
//   "photo": "https://example.com/rdj.jpg"
// }

// {
//   "name": "Scarlett Johansson",
//   "dob": "1984-11-22",
//   "bio": "Known for Black Widow.",
//   "photo": "https://example.com/scarlett.jpg"
// }

// {
//   "name": "Leonardo DiCaprio",
//   "dob": "1974-11-11",
//   "bio": "Known for Inception.",
//   "photo": "https://example.com/leo.jpg"
// }

// {
//   "name": "Tom Hanks",
//   "dob": "1956-07-09",
//   "bio": "Known for Forrest Gump.",
//   "photo": "https://example.com/tomhanks.jpg"
// }

// {
//   "name": "Keanu Reeves",
//   "dob": "1964-09-02",
//   "bio": "Known for Matrix.",
//   "photo": "https://example.com/keanu.jpg"
// }