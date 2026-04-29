import { getCelebrityById, deleteCelebrity, updateCelebrity } from "$lib/models/celebrities.js";
import { json } from "@sveltejs/kit";


// GET
export async function GET({ params }) {
    const id = params.id;
    const res = await getCelebrityById(id);
    return json(res);
}

// DELETE (FIXED)
export async function DELETE({ params }) {
    const id = params.id;
    const res = await deleteCelebrity(id);
    return json(res);
}

export async function PUT({ params, request }) {
    const data = await request.json();
    const id = params.id;
    const res = await updateCelebrity(id, data.name, data.dob, data.bio);
    return json(res);
}