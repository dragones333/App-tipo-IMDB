<script>
  import Nav from "$lib/components/nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MovieCard from "$lib/components/MovieCard.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  let { data } = $props();

  let selectedCategory = $state("");
  let search = $state("");

  let categories = $derived(data.categories ?? []);
  let movies = $derived(data.movies ?? []);
  let activeCategory = $derived(categories.find((category) => category.name === selectedCategory));
  let visibleMovies = $derived(
    movies.filter((movie) => {
      const matchesCategory = selectedCategory ? movie.genres.includes(selectedCategory) : true;
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
  );
</script>

<svelte:head>
  <title>Categorias | Dinamic Movies</title>
  <meta name="description" content="Explora las categorias y peliculas registradas en Dinamic Movies." />
</svelte:head>

<Nav />

<main>
  <section class="categories-page">
    <div class="section-container">
      <SectionHeader
        title="Categorias"
        subtitle="Explora las peliculas organizadas por genero desde tu backend"
      />

      <div class="summary-grid">
        <button
          class="summary-card all-card"
          class:active={!selectedCategory}
          onclick={() => selectedCategory = ""}
        >
          <span class="summary-label">Todo el catalogo</span>
          <strong>{movies.length}</strong>
          <span>{movies.length === 1 ? 'pelicula' : 'peliculas'}</span>
        </button>

        {#each categories as category}
          <button
            class="summary-card"
            class:active={selectedCategory === category.name}
            onclick={() => selectedCategory = category.name}
          >
            <span class="summary-label">{category.name}</span>
            <strong>{category.movieCount}</strong>
            <span>{category.movieCount === 1 ? 'pelicula' : 'peliculas'}</span>
          </button>
        {/each}
      </div>

      <div class="catalog-toolbar">
        <div>
          <h3>{activeCategory?.name || 'Todas las categorias'}</h3>
          <p>
            {visibleMovies.length} {visibleMovies.length === 1 ? 'resultado' : 'resultados'}
            {#if activeCategory?.averageRating}
              | promedio {activeCategory.averageRating.toFixed(1)}
            {/if}
          </p>
        </div>

        <input
          type="text"
          placeholder="Buscar pelicula..."
          bind:value={search}
          class="search-input"
        />
      </div>

      {#if visibleMovies.length > 0}
        <div class="movies-grid">
          {#each visibleMovies as movie (movie.id)}
            <MovieCard {movie} />
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          No hay peliculas que coincidan con esta categoria.
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

  .categories-page {
    padding: 118px 0 70px;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 34px;
  }

  .summary-card {
    min-height: 142px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    padding: 18px;
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.84);
    border: 1px solid rgba(139, 115, 85, 0.16);
    color: var(--text-primary);
    text-align: left;
    box-shadow: 0 14px 34px rgba(42, 33, 24, 0.06);
    transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  .summary-card:hover {
    transform: translateY(-3px);
    border-color: rgba(220, 38, 38, 0.32);
    box-shadow: 0 18px 38px rgba(42, 33, 24, 0.1);
  }

  .summary-card.active {
    transform: translateY(-3px);
    background: #fff5f5;
    border-color: var(--primary);
    color: var(--red-700);
    box-shadow: 0 14px 32px rgba(153, 27, 27, 0.12);
  }

  .all-card {
    background: rgba(255, 255, 255, 0.84);
    color: var(--text-primary);
  }

  .all-card.active {
    background: #fff5f5;
    color: var(--red-700);
  }

  .summary-label {
    color: inherit;
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .summary-card strong {
    font-size: 2.4rem;
    line-height: 1;
  }

  .summary-card span:last-child {
    color: currentColor;
    opacity: 0.72;
    font-size: 0.88rem;
    font-weight: 800;
  }

  .catalog-toolbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }

  .catalog-toolbar h3 {
    color: var(--text-primary);
    font-size: 1.45rem;
  }

  .catalog-toolbar p {
    margin-top: 4px;
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 700;
  }

  .search-input {
    width: min(100%, 360px);
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

    .search-input {
      width: 100%;
    }
  }
</style>
