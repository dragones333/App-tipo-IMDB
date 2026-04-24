<script>
    import MovieCard from "$lib/components/MovieCard.svelte";
    import SectionHeader from "$lib/components/SectionHeader.svelte";

    const recommended = [
        {
            id: 1,
            title: "El Último Horizonte",
            year: 2026,
            rating: 9.2,
            genre: "Sci-Fi",
            poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop"
        },
        {
            id: 2,
            title: "Corazones de Otoño",
            year: 2026,
            rating: 8.7,
            genre: "Romance",
            poster: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop"
        },
        {
            id: 3,
            title: "Sombras del Silencio",
            year: 2025,
            rating: 8.9,
            genre: "Thriller",
            poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop"
        },
        {
            id: 4,
            title: "Aventura Salvaje",
            year: 2026,
            rating: 8.1,
            genre: "Animación",
            poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop"
        },
        {
            id: 5,
            title: "Noches de Neón",
            year: 2025,
            rating: 8.4,
            genre: "Crimen",
            poster: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=600&fit=crop"
        },
        {
            id: 6,
            title: "El Dragón Eterno",
            year: 2026,
            rating: 8.6,
            genre: "Fantasía",
            poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop"
        },
        {
            id: 7,
            title: "Risas al Límite",
            year: 2025,
            rating: 7.8,
            genre: "Comedia",
            poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop"
        },
        {
            id: 8,
            title: "Tierra Primitiva",
            year: 2026,
            rating: 9.0,
            genre: "Documental",
            poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop"
        }
    ];

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
            subtitle="Las películas más populares de esta semana"
            viewAllHref="/peliculas"
        />

        <div class="carousel-wrapper">
            <button class="scroll-btn scroll-left" onclick={scrollLeft} aria-label="Desplazar izquierda">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div class="movies-scroll" bind:this={scrollContainer}>
                {#each recommended as movie (movie.id)}
                    <MovieCard {movie} />
                {/each}
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
