import { 
    getCategoryById, 
    updateCategory, 
    deleteCategory, 
    createCategory, 
    getCategories 
} from "$lib/models/category.js";

import { json } from "@sveltejs/kit";


// GET ALL
export async function GET(){
    const res = await getCategories();
    return json(res);
}

// CREATE
export async function POST({ request }){
    const data = await request.formData();
    const res = await createCategory(data.get('name'));

    return json(res);
}


// DELETE
export async function DELETE({ url }) {
    const id = url.searchParams.get("id");

    const res = await deleteCategory(id);
    return json(res);
}


// UPDATE
export async function PUT({ request }) {
    const data = await request.formData();

    const id = data.get("id");
    const name = data.get("name");

    const res = await updateCategory(id, name);

    return json(res);
}