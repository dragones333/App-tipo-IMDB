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