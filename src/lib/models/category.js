import { query } from "$lib/db";

// CREATE
export async function createCategory(name){
    try {
        const res = await query(
            "INSERT INTO categories (name) VALUES (?)",
            [name]
        );
        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: 'Error del servidor' };
    }
}


// GET ALL
export async function getCategories(){
    try {
        const res = await query("SELECT * FROM categories");
        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: 'Error del servidor' };
    }
}


// GET ONE
export async function getCategoryById(id){
    try {
        const res = await query(
            "SELECT * FROM categories WHERE id = ?",
            [id]
        );

        if (res.length === 0) {
            return { 
                success: false, 
                message: "Category not found",
                status: 404
            };
        }

        return { success: true, data: res[0] };

    } catch (error) {
        return { 
            success: false, 
            message: "Error getting category" 
        };
    }
}


// DELETE
export async function deleteCategory(id){
    try {
        const res = await query(
            "DELETE FROM categories WHERE id = ?",
            [id]
        );
        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error deleting" };
    }
}


// UPDATE
export async function updateCategory(id, name){
    try {
        const res = await query(
            "UPDATE categories SET name = ? WHERE id = ?",
            [name, id]
        );

        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error updating" };
    }
}