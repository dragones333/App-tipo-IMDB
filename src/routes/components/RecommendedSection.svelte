<script>
    import MovieCard from "$lib/components/MovieCard.svelte";
    import SectionHeader from "$lib/components/SectionHeader.svelte";

    let { movies = [] } = $props();
    let scrollContainer;

    function scrollLeft() {
        scrollContainer.scrollBy({ left: -440, behavior: 'smooth' });
    }

    function scrollRight() {
        scrollContainer.scrollBy({ left: 440, behavior: 'smooth' });
    }
</script>

<section class="recommended-section" id="recomendadas">
    <div class="section-container">
        <SectionHeader
            title="Recomendadas para Ti"
            subtitle="Las peliculas mas populares de esta semana"
            viewAllHref="/peliculas"
        />

        <div class="carousel-wrapper">
            <button class="scroll-btn scroll-left" onclick={scrollLeft} aria-label="Desplazar izquierda">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div class="movies-scroll" bind:this={scrollContainer}>
                {#if movies.length > 0}
                    {#each movies as movie (movie.id)}
                        <MovieCard {movie} />
                    {/each}
                {:else}
                    <p class="empty-state">No hay peliculas registradas.</p>
                {/if}
            </div>

            <button class="scroll-btn scroll-right" onclick={scrollRight} aria-label="Desplazar derecha">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    </div>
</section>

<style>
    .recommended-section {
        padding: 64px 0 0;
    }

    .carousel-wrapper {
        position: relative;
    }

    .movies-scroll {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding: 8px 0 16px;
        scrollbar-width: none;
    }

    .movies-scroll::-webkit-scrollbar {
        display: none;
    }

    .movies-scroll > :global(*) {
        scroll-snap-align: start;
    }

    .empty-state {
        color: var(--text-secondary);
        padding: 24px 0;
    }

    .scroll-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-70%);
        z-index: 10;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--white);
        color: var(--gray-700);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-fast);
        border: 1px solid var(--gray-200);
        opacity: 0;
    }

    .carousel-wrapper:hover .scroll-btn {
        opacity: 1;
    }

    .scroll-btn:hover {
        background: var(--primary);
        color: var(--white);
        border-color: var(--primary);
        transform: translateY(-70%) scale(1.1);
    }

    .scroll-left {
        left: -18px;
    }

    .scroll-right {
        right: -18px;
    }

    @media (max-width: 768px) {
        .recommended-section {
            padding: 48px 0 0;
        }
        .scroll-btn {
            display: none;
        }
    }
</style>
