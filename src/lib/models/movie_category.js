import { query } from "$lib/db";

// CREATE relation
export async function createMovieCategory(movie_id, category_id) {
    try {
        const res = await query(
            `INSERT INTO movie_category (movie_id, category_id)
             VALUES (?, ?)`,
            [movie_id, category_id]
        );

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error creating relation" };
    }
}

export async function getMovieCategories() {
    try {
        const res = await query(`
            SELECT mc.id,
                   m.title AS movie,
                   c.name AS category
            FROM movie_category mc
            JOIN movies m ON mc.movie_id = m.id
            JOIN categories c ON mc.category_id = c.id
        `);

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error fetching data" };
    }
}

export async function getMovieCategoryById(id) {
    try {
        const res = await query(`
            SELECT mc.id,
                   m.title AS movie,
                   c.name AS category
            FROM movie_category mc
            JOIN movies m ON mc.movie_id = m.id
            JOIN categories c ON mc.category_id = c.id
            WHERE mc.id = ?
        `, [id]);

        if (res.length === 0) {
            return { success: false, message: "Not found", status: 404 };
        }

        return { success: true, data: res[0] };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error fetching relation" };
    }
}

export async function updateMovieCategory(id, movie_id, category_id) {
    try {
        const res = await query(
            `UPDATE movie_category
             SET movie_id = ?, category_id = ?
             WHERE id = ?`,
            [movie_id, category_id, id]
        );

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error updating relation" };
    }
}

export async function deleteMovieCategory(id) {
    try {
        const res = await query(
            "DELETE FROM movie_category WHERE id = ?",
            [id]
        );

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error deleting relation" };
    }
}