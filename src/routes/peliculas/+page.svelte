<script>
  import Nav from "$lib/components/nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MovieCard from "$lib/components/MovieCard.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  let { data } = $props();

  let search = $state("");
  let selectedCategory = $state("");
  let selectedRating = $state("");

  let movies = $derived(data.movies ?? []);
  let categories = $derived(
    [...new Set(movies.flatMap((movie) => movie.genres?.length ? movie.genres : [movie.genre]).filter(Boolean))]
  );

  let filteredMovies = $derived(
    movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
      const movieCategories = movie.genres?.length ? movie.genres : [movie.genre];
      const matchesCategory = selectedCategory ? movieCategories.includes(selectedCategory) : true;
      const matchesRating = selectedRating ? movie.rating >= selectedRating : true;

      return matchesSearch && matchesCategory && matchesRating;
    })
  );
</script>

<svelte:head>
  <title>Peliculas | Dinamic Movies</title>
  <meta name="description" content="Explora todas las peliculas registradas en Dinamic Movies." />
</svelte:head>

<Nav />

<main>
  <section class="catalog-page">
    <div class="section-container">
      <a href="/" class="back-home" aria-label="Regresar al menu principal">
        <span aria-hidden="true">←</span>
        Menu principal
      </a>

      <SectionHeader
        title="Catalogo de Peliculas"
        subtitle="Busca, filtra y descubre peliculas desde tu backend"
      />

      <div class="catalog-toolbar">
        <input
          type="text"
          placeholder="Buscar pelicula..."
          bind:value={search}
          class="search-input"
        />

        <div class="result-count">
          {filteredMovies.length} de {movies.length} peliculas
        </div>
      </div>

      <div class="filters">
        <button
          class:active={!selectedCategory}
          onclick={() => selectedCategory = ""}
        >
          Todas
        </button>

        {#each categories as cat}
          <button
            class:active={selectedCategory === cat}
            onclick={() => selectedCategory = cat}
          >
            {cat}
          </button>
        {/each}
      </div>

      <div class="filters rating-filters">
        <button class:active={!selectedRating} onclick={() => selectedRating = ""}>Todas las calificaciones</button>
        <button class:active={selectedRating === 7} onclick={() => selectedRating = 7}>7+</button>
        <button class:active={selectedRating === 8} onclick={() => selectedRating = 8}>8+</button>
        <button class:active={selectedRating === 9} onclick={() => selectedRating = 9}>9+</button>
      </div>

      {#if filteredMovies.length > 0}
        <div class="movies-grid">
          {#each filteredMovies as movie (movie.id)}
            <MovieCard {movie} />
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          No hay peliculas que coincidan con los filtros.
        </div>
      {/if}
    </div>
  </section>
</main>

<Footer />

<style>
  main {
    min-height: 100vh;
  }

  .catalog-page {
    padding: 118px 0 70px;
  }

  .back-home {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 22px;
    padding: 10px 16px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(139, 115, 85, 0.14);
    color: var(--text-primary);
    font-size: 0.9rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 0 10px 26px rgba(42, 33, 24, 0.06);
    transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  .back-home:hover {
    transform: translateX(-3px);
    border-color: rgba(220, 38, 38, 0.26);
    box-shadow: 0 14px 30px rgba(42, 33, 24, 0.1);
  }

  .back-home span {
    font-size: 1.1rem;
    line-height: 1;
  }

  .catalog-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
  }

  .search-input {
    width: min(100%, 520px);
    padding: 13px 18px;
    border-radius: var(--radius-full);
    border: 1px solid rgba(139, 115, 85, 0.18);
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-primary);
    outline: none;
    box-shadow: 0 10px 28px rgba(42, 33, 24, 0.06);
  }

  .search-input:focus {
    border-color: rgba(220, 38, 38, 0.38);
    box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08);
  }

  .result-count {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  .rating-filters {
    margin-bottom: 28px;
  }

  .filters button {
    padding: 9px 18px;
    border-radius: var(--radius-full);
    background: var(--gray-100);
    color: var(--text-secondary);
    font-weight: 700;
    transition: all var(--transition-fast);
  }

  .filters button:hover {
    background: var(--gray-200);
    color: var(--text-primary);
  }

  .filters button.active {
    background: var(--primary);
    color: var(--white);
    box-shadow: 0 8px 22px rgba(220, 38, 38, 0.18);
  }

  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
    align-items: start;
  }

  .movies-grid :global(.movie-card) {
    width: 100%;
  }

  .empty-state {
    padding: 36px;
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.78);
    border: 1px solid rgba(139, 115, 85, 0.16);
    color: var(--text-secondary);
    font-weight: 700;
  }

  @media (max-width: 720px) {
    .catalog-toolbar {
      align-items: stretch;
      flex-direction: column;
    }

    .result-count {
      white-space: normal;
    }
  }
</style>
