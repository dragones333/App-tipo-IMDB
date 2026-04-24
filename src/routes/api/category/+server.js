import { 
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
    const data = await request.json();

    const res = await createCategory(data.name);

    return json(res);
}

