import { json, error } from '@sveltejs/kit';
import { celebrities } from '$lib/celebrities';

export async function GET({ params }) {
    const id = parseInt(params.id);
    const celebrity = celebrities.find(c => c.id === id);

    if (!celebrity) throw error(404, 'Celebridad no encontrada');
    return json(celebrity);
}

export async function PUT({ params, request }) {
    const id = parseInt(params.id);
    const data = await request.json();
    const index = celebrities.findIndex(c => c.id === id);

    if (index === -1) throw error(404, 'No se pudo actualizar: no existe');

    celebrities[index] = { ...celebrities[index], ...data, id };
    
    return json(celebrities[index]);
}

export async function DELETE({ params }) {
    const id = parseInt(params.id);
    const index = celebrities.findIndex(c => c.id === id);

    if (index === -1) throw error(404, 'No se pudo eliminar: no existe');

    const deleted = celebrities.splice(index, 1);
    
    return json({ 
        message: 'Celebridad eliminada con éxito',
        deleted: deleted[0] 
    });
}