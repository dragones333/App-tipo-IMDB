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
                        <span class="tab-dot" aria-hidden="true"></span>
                        <span class="tab-label">{cat.name}</span>
                        {#if cat.movieCount}
                            <span class="tab-count">{cat.movieCount}</span>
                        {/if}
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
        gap: 10px;
        overflow-x: auto;
        padding: 2px 2px 10px;
        scrollbar-width: none;
        margin-bottom: 28px;
    }

    .category-tabs::-webkit-scrollbar {
        display: none;
    }

    .tab-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        min-height: 36px;
        padding: 7px 13px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.82);
        color: var(--text-secondary);
        font-size: 0.82rem;
        font-weight: 800;
        white-space: nowrap;
        transition: all var(--transition-fast);
        border: 1px solid rgba(139, 115, 85, 0.14);
        box-shadow: 0 8px 20px rgba(42, 33, 24, 0.05);
    }

    .tab-btn:hover {
        background: var(--white);
        color: var(--text-primary);
        border-color: rgba(220, 38, 38, 0.22);
        transform: translateY(-1px);
    }

    .tab-btn.active {
        background: linear-gradient(135deg, #7f1d1d, #b91c1c);
        color: var(--white);
        border-color: rgba(255, 255, 255, 0.55);
        box-shadow: 0 12px 24px rgba(127, 29, 29, 0.18);
    }

    .tab-dot {
        width: 7px;
        height: 7px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: rgba(153, 27, 27, 0.42);
    }

    .tab-btn.active .tab-dot {
        background: var(--white);
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.18);
    }

    .tab-count {
        min-width: 22px;
        padding: 3px 7px;
        border-radius: var(--radius-full);
        background: rgba(153, 27, 27, 0.08);
        color: var(--red-700);
        font-size: 0.72rem;
        line-height: 1;
        text-align: center;
    }

    .tab-btn.active .tab-count {
        background: rgba(255, 255, 255, 0.2);
        color: var(--white);
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
            min-height: 34px;
            padding: 6px 11px;
            font-size: 0.78rem;
        }

        .tab-count {
            min-width: 20px;
            padding: 3px 6px;
        }
    }
</style>
