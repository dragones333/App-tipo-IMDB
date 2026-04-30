<script>
  import { onMount } from "svelte";
  import MovieCard from "$lib/components/MovieCard.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  // 🔥 estado reactivo (Svelte 5)
  let movies = $state([]);
  let search = $state("");
  let selectedCategory = $state("");
  let selectedRating = $state("");

  // 🚀 traer datos desde API
  async function loadMovies() {
    const res = await fetch("/api/movie");
    const data = await res.json();

    movies = data.map(m => ({
      id: m.id,
      title: m.title,
      poster: m.poster,
      genre: m.genre,
      rating: m.rating,
      year: m.year
    }));
  }

  onMount(loadMovies);

  // 🎯 categorías dinámicas
  const categories = $derived(
    [...new Set(movies.map(m => m.genre))]
  );

  // 🔍 filtros (Svelte 5)
  const filteredMovies = $derived(
    movies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory ? movie.genre === selectedCategory : true) &&
        (selectedRating ? movie.rating >= selectedRating : true)
      );
    })
  );
</script>

<section class="catalog-page">
  <div class="section-container">

    <SectionHeader
      title="Catálogo de Películas"
      subtitle="Busca, filtra y descubre nuevas películas"
    />

    <!-- 🔍 BUSCADOR -->
    <input
      type="text"
      placeholder="Buscar película..."
      bind:value={search}
      class="search-input"
    />

    <!-- 🎯 CATEGORÍAS -->
    <div class="filters">
      <button
        class:active={!selectedCategory}
        on:click={() => selectedCategory = ""}
      >
        Todas
      </button>

      {#each categories as cat}
        <button
          class:active={selectedCategory === cat}
          on:click={() => selectedCategory = cat}
        >
          {cat}
        </button>
      {/each}
    </div>

    <!-- ⭐ RATING -->
    <div class="filters">
      <button on:click={() => selectedRating = ""}>Todas</button>
      <button on:click={() => selectedRating = 7}>7+</button>
      <button on:click={() => selectedRating = 8}>8+</button>
      <button on:click={() => selectedRating = 9}>9+</button>
    </div>

    <!-- 🎬 GRID -->
    <div class="movies-grid">
      {#each filteredMovies as movie (movie.id)}
        <MovieCard {movie} />
      {/each}
    </div>

  </div>
</section>

<style>
.catalog-page {
  padding: 110px 0 60px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.filters button {
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  background: #eee;
  cursor: pointer;
}

.filters button.active {
  background: black;
  color: white;
}

.movies-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}
</style>