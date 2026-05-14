import { query } from "$lib/db";

// CREATE
export async function createCelebrity(name, dob, bio, image_url = null){
    try {
        const res = await query(
            `INSERT INTO celebrities (name, dob, bio, image_url)
             VALUES (?, ?, ?, ?)`,
            [name, dob, bio, image_url]
        );
        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: "Error del servidor" };
    }
}


// GET ALL
export async function getCelebrities(){
    try {
        const res = await query("SELECT * FROM celebrities");
        return { success: true, data: res };
    } catch (error) {
        return { success: false, data: [], message: "Error del servidor" };
    }
}


// GET ONE
export async function getCelebrityById(id){
    try {
        const res = await query(
            "SELECT * FROM celebrities WHERE id = ?",
            [id]
        );

        if (res.length === 0) {
            return {
                success: false,
                message: "Celebrity not found",
                status: 404
            };
        }

        return { success: true, data: res[0] };

    } catch (error) {
        return { success: false, message: "Error getting celebrity" };
    }
}


// DELETE
export async function deleteCelebrity(id){
    try {
        const res = await query(
            "DELETE FROM celebrities WHERE id = ?",
            [id]
        );

        return { success: true, data: res };

    } catch (error) {
        return { success: false, message: "Error deleting celebrity" };
    }
}


// UPDATE
export async function updateCelebrity(id, name, dob, bio, image_url){
    try {
        const res = await query(
            `UPDATE celebrities 
             SET name = ?, dob = ?, bio = ?, image_url = ?
             WHERE id = ?`,
            [name, dob, bio, image_url, id]
        );
        return { success: true, data: res };
    } catch (error) {
        return { success: false, message: "Error updating celebrity" };
    }
}
