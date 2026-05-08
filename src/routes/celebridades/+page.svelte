<script>
  import Nav from "$lib/components/nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import CelebCard from "$lib/components/CelebCard.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  let { data } = $props();

  let search = $state("");
  let selectedRole = $state("");
  let onlyTrending = $state(false);

  let celebrities = $derived(data.celebrities ?? []);
  let roles = $derived(
    [...new Set(celebrities.flatMap((celeb) => celeb.roles?.length ? celeb.roles : [celeb.role]).filter(Boolean))]
  );

  let filteredCelebrities = $derived(
    celebrities.filter((celeb) => {
      const matchesSearch = celeb.name.toLowerCase().includes(search.toLowerCase());
      const celebRoles = celeb.roles?.length ? celeb.roles : [celeb.role];
      const matchesRole = selectedRole ? celebRoles.includes(selectedRole) : true;
      const matchesTrending = onlyTrending ? celeb.trending : true;

      return matchesSearch && matchesRole && matchesTrending;
    })
  );
</script>

<svelte:head>
  <title>Actores y Celebridades | Dinamic Movies</title>
  <meta name="description" content="Explora todos los actores y celebridades registrados en Dinamic Movies." />
</svelte:head>

<Nav />

<main>
  <section class="celebrities-page">
    <div class="section-container">
      <SectionHeader
        title="Actores y Celebridades"
        subtitle="Busca, filtra y descubre perfiles desde tu backend"
      />

      <div class="catalog-toolbar">
        <input
          type="text"
          placeholder="Buscar actor..."
          bind:value={search}
          class="search-input"
        />

        <div class="result-count">
          {filteredCelebrities.length} de {celebrities.length} actores
        </div>
      </div>

      <div class="filters">
        <button class:active={!selectedRole} onclick={() => selectedRole = ""}>
          Todos
        </button>

        {#each roles as role}
          <button class:active={selectedRole === role} onclick={() => selectedRole = role}>
            {role}
          </button>
        {/each}
      </div>

      <div class="filters trend-filters">
        <button class:active={!onlyTrending} onclick={() => onlyTrending = false}>
          Todos los perfiles
        </button>
        <button class:active={onlyTrending} onclick={() => onlyTrending = true}>
          En tendencia
        </button>
      </div>

      {#if filteredCelebrities.length > 0}
        <div class="celebrities-grid">
          {#each filteredCelebrities as celeb (celeb.id)}
            <div class="celeb-cell">
              {#if celeb.trending}
                <div class="trending-indicator" title="En tendencia">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
              {/if}

              <CelebCard {celeb} />

              <div class="celeb-meta">
                <span>{celeb.movieCount} {celeb.movieCount === 1 ? 'pelicula' : 'peliculas'}</span>
                {#if celeb.popularity}
                  <span>{celeb.popularity} popularidad</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          No hay actores que coincidan con los filtros.
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

  .celebrities-page {
    padding: 118px 0 70px;
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

  .trend-filters {
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

  .celebrities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
    gap: 24px;
    align-items: start;
  }

  .celeb-cell {
    position: relative;
    display: grid;
    gap: 10px;
  }

  .celeb-cell :global(.celeb-card) {
    width: 100%;
  }

  .trending-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ef4444, #b91c1c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 16px rgba(220, 38, 38, 0.38);
  }

  .celeb-meta {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    color: var(--text-secondary);
    font-size: 0.76rem;
    font-weight: 800;
    text-align: center;
  }

  .celeb-meta span {
    padding: 5px 9px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(139, 115, 85, 0.12);
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
