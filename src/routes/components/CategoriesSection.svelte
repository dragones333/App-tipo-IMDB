<script>
    import MovieCard from "$lib/components/MovieCard.svelte";
    import SectionHeader from "$lib/components/SectionHeader.svelte";

    let { categories = [] } = $props();
    let activeCategory = $state(0);
</script>

<section class="categories-section" id="categorias">
    <div class="section-container">
        <SectionHeader
            title="Explorar por Categoria"
            subtitle="Encuentra tu proxima pelicula favorita"
            viewAllHref="/categorias"
            viewAllText="Todas las categorias"
        />

        {#if categories.length > 0}
            <div class="category-tabs">
                {#each categories as cat, i}
                    <button
                        class="tab-btn"
                        class:active={i === activeCategory}
                        onclick={() => activeCategory = i}
                        id="category-tab-{cat.name.toLowerCase().replace(/\s/g, '-')}"
                    >
                        <span class="tab-label">{cat.name}</span>
                    </button>
                {/each}
            </div>

            <div class="category-movies">
                {#key activeCategory}
                    <div class="movies-grid">
                        {#if categories[activeCategory]?.movies?.length > 0}
                            {#each categories[activeCategory].movies as movie (movie.id)}
                                <MovieCard {movie} />
                            {/each}
                        {:else}
                            <p class="empty-state">No hay peliculas en esta categoria.</p>
                        {/if}
                    </div>
                {/key}
            </div>
        {:else}
            <p class="empty-state">No hay categorias registradas.</p>
        {/if}
    </div>
</section>

<style>
    .categories-section {
        padding: 72px 0 0;
    }

    .category-tabs {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 8px;
        scrollbar-width: none;
        margin-bottom: 32px;
    }

    .category-tabs::-webkit-scrollbar {
        display: none;
    }

    .tab-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 22px;
        border-radius: var(--radius-full);
        background: var(--gray-100);
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 600;
        white-space: nowrap;
        transition: all var(--transition-fast);
        border: 2px solid transparent;
    }

    .tab-btn:hover {
        background: var(--gray-200);
        color: var(--text-primary);
    }

    .tab-btn.active {
        background: var(--white);
        color: var(--text-primary);
        border-color: var(--primary);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    }

    .movies-grid {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding: 8px 0 16px;
        scrollbar-width: none;
        animation: fadeSlideIn 0.4s ease;
    }

    .movies-grid::-webkit-scrollbar {
        display: none;
    }

    .empty-state {
        color: var(--text-secondary);
        padding: 24px 0;
    }

    @keyframes fadeSlideIn {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .categories-section {
            padding: 48px 0 0;
        }
        .tab-btn {
            padding: 8px 16px;
            font-size: 0.82rem;
        }
    }
</style>
