import { query } from "$lib/db";


// CREATE
export async function createMovie(title, duration, director, synopsis, release_date, image_url, rating){
    try {
        const res = await query(
            `INSERT INTO movies (title, duration, director, synopsis, release_date, image_url, rating)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, duration, director, synopsis, release_date, image_url, rating]
        );

        return { success: true, data: res };

    } catch (error) {
        return { success: false, data: [], message: "Error del servidor" };
    }
}


// GET ALL
export async function getMovies(){
    try {
        const res = await query("SELECT * FROM movies");
        return { success: true, data: res };

    } catch (error) {
        return { success: false, data: [], message: "Error del servidor" };
    }
}


// GET ONE
export async function getMovieById(id){
    try {
        const res = await query(
            "SELECT * FROM movies WHERE id = ?",
            [id]
        );

        if (res.length === 0) {
            return {
                success: false,
                message: "Movie not found",
                status: 404
            };
        }

        return { success: true, data: res[0] };

    } catch (error) {
        return {
            success: false,
            message: "Error getting movie"
        };
    }
}


// DELETE
export async function deleteMovie(id){
    try {
        const res = await query(
            "DELETE FROM movies WHERE id = ?",
            [id]
        );

        return { success: true, data: res };

    } catch (error) {
        return { success: false, message: "Error deleting movie" };
    }
}


// UPDATE
export async function updateMovie(id, title, duration, director, synopsis, release_date, image_url, rating){
    try {
        const res = await query(
            `UPDATE movies 
             SET title = ?, duration = ?, director = ?, synopsis = ?, release_date = ?, image_url = ?, rating = ?
             WHERE id = ?`,
            [title, duration, director, synopsis, release_date, image_url, rating, id]
        );

        return { success: true, data: res };

    } catch (error) {
        return { success: false, message: "Error updating movie" };
    }
}

export async function getFilteredMovies({ rating, category, actor }) {
    try {
        let queryStr = `
            SELECT DISTINCT m.*
            FROM movies m
            LEFT JOIN movie_category mc ON m.id = mc.movie_id
            LEFT JOIN celebrity_movie cm ON m.id = cm.movie_id
            WHERE 1=1
        `;

        const params = [];

        if (rating) {
            queryStr += " AND m.rating >= ?";
            params.push(rating);
        }

        if (category) {
            queryStr += " AND mc.category_id = ?";
            params.push(category);
        }

        if (actor) {
            queryStr += " AND cm.celebrity_id = ?";
            params.push(actor);
        }

        const res = await query(queryStr, params);

        return { success: true, data: res };

    } catch (error) {
    console.error("FILTER ERROR:", error); // 👈 THIS is key
    return { success: false, message: error.message };
}
}