import { getAllCelebrities, createCelebrity, updateCelebrity, deleteCelebrity } from '$lib/models/celebrities';

export async function load() {
    const celebrities = await getAllCelebrities();
    return {
        celebrities
    };
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const dob = data.get('dob') || null;
        const bio = data.get('bio') || null;

        await createCelebrity({ name, dob, bio });
        return { success: true };
    },
    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const name = data.get('name');
        const dob = data.get('dob') || null;
        const bio = data.get('bio') || null;

        await updateCelebrity(id, { name, dob, bio });
        return { success: true };
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        await deleteCelebrity(id);
        return { success: true };
    }
};
