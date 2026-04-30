import { getCategoryById, deleteCategory, updateCategory } from "$lib/models/category.js";
import { json } from "@sveltejs/kit";

// GET
export async function GET({ params }) {
    const id = params.id;
    const res = await getCategoryById(id);
    return json(res);
}

// DELETE (FIXED)
export async function DELETE({ params }) {
    const id = params.id;

    const res = await deleteCategory(id);
    return json(res);
}

export async function PUT({ params, request }) {
    const data = await request.json();

    const id = params.id; // ✅ get id from URL
    const name = data.name;

    const res = await updateCategory(id, name);

    return json(res);
}