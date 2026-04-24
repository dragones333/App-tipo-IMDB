import { json, error } from '@sveltejs/kit';
import { getCelebrityById } from '$lib/models/celebrities';

export async function GET({ params }) {
    const celebrity = await getCelebrityById(params.id);
    if(celebrity){
        return json({ success: true,  data: celebrity}, {status: 200});
    }else{
        return json({ success: false, message: 'Celebridad no encontrada' }, {status: 404});
    }
}

export async function PUT({ params, request }) {
//TODO: Implementar PUT
}

export async function DELETE({ params }) {
//TODO: Implementar DELETE
}