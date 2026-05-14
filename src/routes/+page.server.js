import { getAllCelebrities } from "$lib/models/celebrities";
// import { getAllMovies } from "$lib/models/movies";

export async function load() {
    const celebrities = await getAllCelebrities();
    // const movies = await getAllMovies();
    return { celebrities }
}