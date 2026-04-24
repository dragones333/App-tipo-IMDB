import { query } from "$lib/db"

export async function getAllCelebrities() {
    const res = await query("SELECT * FROM celebrities");
    return res;
}

export async function getCelebrityById(id) {
    const res = await query("SELECT * FROM celebrities WHERE id = ?", [id]);
    return res[0];
}
