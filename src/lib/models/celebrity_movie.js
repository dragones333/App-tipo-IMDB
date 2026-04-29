import { query } from "$lib/db";

// CREATE relation (link celebrity ↔ movie)
export async function createCelebrityMovie(movie_id, celebrity_id, role) {
    try {
        const res = await query(
            `INSERT INTO celebrity_movie (movie_id, celebrity_id, role)
             VALUES (?, ?, ?)`,
            [movie_id, celebrity_id, role]
        );

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error creating relation" };
    }
}


export async function getCelebrityMovies() {
    try {
        const res = await query(`
            SELECT cm.id, cm.role,
                   m.title AS movie,
                   c.name AS celebrity
            FROM celebrity_movie cm
            JOIN movies m ON cm.movie_id = m.id
            JOIN celebrities c ON cm.celebrity_id = c.id
        `);

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error fetching data" };
    }
}


export async function getCelebrityMovieById(id) {
    try {
        const res = await query(
            `SELECT cm.id, cm.role,
                    m.title AS movie,
                    c.name AS celebrity
             FROM celebrity_movie cm
             JOIN movies m ON cm.movie_id = m.id
             JOIN celebrities c ON cm.celebrity_id = c.id
             WHERE cm.id = ?`,
            [id]
        );

        if (res.length === 0) {
            return { success: false, message: "Not found", status: 404 };
        }

        return { success: true, data: res[0] };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error fetching relation" };
    }
}


export async function updateCelebrityMovie(id, movie_id, celebrity_id, role) {
    try {
        const res = await query(
            `UPDATE celebrity_movie
             SET movie_id = ?, celebrity_id = ?, role = ?
             WHERE id = ?`,
            [movie_id, celebrity_id, role, id]
        );

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error updating relation" };
    }
}


export async function deleteCelebrityMovie(id) {
    try {
        const res = await query(
            "DELETE FROM celebrity_movie WHERE id = ?",
            [id]
        );

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error deleting relation" };
    }
}