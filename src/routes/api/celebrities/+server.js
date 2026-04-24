import { json } from '@sveltejs/kit';
import { getAllCelebrities } from '$lib/models/celebrities';

export async function GET() {
    const celebrities = await getAllCelebrities();
    return json({ success: true, data: celebrities}, {status: 200});
}

export async function POST({ request }) {
    //TODO: Implementar POST
}