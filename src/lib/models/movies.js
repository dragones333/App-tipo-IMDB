import { query } from "$lib/db";

export async function searchMovies(text = '', categoryId = null, minRating = 0) {
    try {
        // Base de la consulta
        let sql = `
            SELECT m.*, c.name as category_name 
            FROM movies m
            LEFT JOIN categories c ON m.category_id = c.id
            WHERE (m.title LIKE ? OR m.description LIKE ?)
            AND m.rating >= ?
        `;
        
        const params = [`%${text}%`, `%${text}%`, minRating];

        // Si se envía una categoría específica (que no sea "Todas")
        if (categoryId && categoryId !== 'all') {
            sql += " AND m.category_id = ?";
            params.push(categoryId);
        }

        const res = await query(sql, params);
        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, data: [], message: 'Error al buscar películas' };
    }
}