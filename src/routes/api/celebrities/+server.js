import { json } from '@sveltejs/kit';
import { celebrities } from '$lib/celebrities';

export async function GET() {
    return json(celebrities);
}

export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Validación básica
        if (!data.name) {
            return json({ error: 'El nombre es obligatorio' }, { status: 400 });
        }

        const newCelebrity = {
            // Generamos ID único basado en el más alto
            id: celebrities.length > 0 ? Math.max(...celebrities.map(c => c.id)) + 1 : 1,
            name: data.name,
            role: data.role || 'Actor/Actriz',
            photo_url: data.photo_url || 'https://via.placeholder.com/150',
            popularity_score: data.popularity_score || 0,
            bio: data.bio || ''
        };
        
        celebrities.push(newCelebrity);
        return json(newCelebrity, { status: 201 });
    } catch (err) {
        return json({ error: 'Formato de datos inválido' }, { status: 400 });
    }
}