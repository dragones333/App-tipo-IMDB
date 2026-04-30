import { query } from "$lib/db";


// CREATE
export async function createMovie(title, duration, director, synopsis, release_date, image_url){
    try {
        const res = await query(
            `INSERT INTO movies (title, duration, director, synopsis, release_date, image_url)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, duration, director, synopsis, release_date, image_url]
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
export async function updateMovie(id, title, duration, director, synopsis, release_date, image_url){
    try {
        const res = await query(
            `UPDATE movies 
             SET title = ?, duration = ?, director = ?, synopsis = ?, release_date = ?, image_url = ?
             WHERE id = ?`,
            [title, duration, director, synopsis, release_date, image_url, id]
        );

        return { success: true, data: res };

    } catch (error) {
        return { success: false, message: "Error updating movie" };
    }
}