import { query } from "$lib/db"

export async function getAllCelebrities() {
    const res = await query("SELECT * FROM celebrities ORDER BY id DESC");
    return res;
}

export async function getCelebrityById(id) {
    const res = await query("SELECT * FROM celebrities WHERE id = ?", [id]);
    return res[0];
}

export async function createCelebrity(data) {
    const res = await query(
        "INSERT INTO celebrities (name, dob, bio) VALUES (?, ?, ?)",
        [data.name, data.dob || null, data.bio || null]
    );
    return res;
}

export async function updateCelebrity(id, data) {
    const res = await query(
        "UPDATE celebrities SET name = ?, dob = ?, bio = ? WHERE id = ?",
        [data.name, data.dob || null, data.bio || null, id]
    );
    return res;
}

export async function deleteCelebrity(id) {
    const res = await query("DELETE FROM celebrities WHERE id = ?", [id]);
    return res;
}
