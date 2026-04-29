<script>
    import MovieCard from "$lib/components/MovieCard.svelte";
    import SectionHeader from "$lib/components/SectionHeader.svelte";

    const categories = [
        {
            name: "Acción",
            icon: "💥",
            color: "#dc2626",
            movies: [
                { id: 10, title: "Furia Imparable", year: 2026, rating: 8.3, genre: "Acción", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
                { id: 11, title: "Zona de Impacto", year: 2025, rating: 7.9, genre: "Acción", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
                { id: 12, title: "Código Rojo", year: 2026, rating: 8.5, genre: "Acción", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
                { id: 13, title: "Operación Trueno", year: 2025, rating: 7.6, genre: "Acción", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop" },
                { id: 14, title: "El Último Guerrero", year: 2026, rating: 8.1, genre: "Acción", poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop" },
            ]
        },
        {
            name: "Drama",
            icon: "🎭",
            color: "#8b7355",
            movies: [
                { id: 20, title: "Ecos del Pasado", year: 2026, rating: 9.1, genre: "Drama", poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
                { id: 21, title: "La Carta Final", year: 2025, rating: 8.8, genre: "Drama", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop" },
                { id: 22, title: "Caminos Cruzados", year: 2026, rating: 8.4, genre: "Drama", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
                { id: 23, title: "Bajo la Lluvia", year: 2025, rating: 8.7, genre: "Drama", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
                { id: 24, title: "El Precio del Silencio", year: 2026, rating: 9.0, genre: "Drama", poster: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop" },
            ]
        },
        {
            name: "Comedia",
            icon: "😂",
            color: "#f59e0b",
            movies: [
                { id: 30, title: "Loca Aventura", year: 2026, rating: 7.5, genre: "Comedia", poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop" },
                { id: 31, title: "La Boda del Siglo", year: 2025, rating: 7.8, genre: "Comedia", poster: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=400&h=600&fit=crop" },
                { id: 32, title: "Vecinos Imposibles", year: 2026, rating: 7.3, genre: "Comedia", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
                { id: 33, title: "Plan Perfecto", year: 2025, rating: 8.0, genre: "Comedia", poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=600&fit=crop" },
                { id: 34, title: "Caos Familiar", year: 2026, rating: 7.7, genre: "Comedia", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
            ]
        },
        {
            name: "Terror",
            icon: "👻",
            color: "#1e1e1e",
            movies: [
                { id: 40, title: "La Casa Olvidada", year: 2026, rating: 8.2, genre: "Terror", poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop" },
                { id: 41, title: "Susurros Oscuros", year: 2025, rating: 8.6, genre: "Terror", poster: "https://images.unsplash.com/photo-1509248961620-e1da6a49e0c8?w=400&h=600&fit=crop" },
                { id: 42, title: "El Ritual", year: 2026, rating: 7.9, genre: "Terror", poster: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=600&fit=crop" },
                { id: 43, title: "Noche sin Fin", year: 2025, rating: 8.0, genre: "Terror", poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop" },
                { id: 44, title: "La Última Puerta", year: 2026, rating: 8.4, genre: "Terror", poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop" },
            ]
        },
        {
            name: "Ciencia Ficción",
            icon: "🚀",
            color: "#6366f1",
            movies: [
                { id: 50, title: "Planeta Omega", year: 2026, rating: 8.8, genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop" },
                { id: 51, title: "Horizonte Digital", year: 2025, rating: 8.5, genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop" },
                { id: 52, title: "Señal Cósmica", year: 2026, rating: 9.1, genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop" },
                { id: 53, title: "Código Génesis", year: 2025, rating: 8.3, genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop" },
                { id: 54, title: "Última Frontera", year: 2026, rating: 8.7, genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
            ]
        }
    ];

    let activeCategory = $state(0);
</script>

<section class="categories-section" id="categorias">
    <div class="section-container">
        <SectionHeader
            title="Explorar por Categoría"
            subtitle="Encuentra tu próxima película favorita"
            viewAllHref="/categorias"
            viewAllText="Todas las categorías"
        />

        <!-- Category Tabs -->
        <div class="category-tabs">
            {#each categories as cat, i}
                <button
                    class="tab-btn"
                    class:active={i === activeCategory}
                    onclick={() => activeCategory = i}
                    style="--tab-color: {cat.color}"
                    id="category-tab-{cat.name.toLowerCase().replace(/\s/g, '-')}"
                >
                    <span class="tab-icon">{cat.icon}</span>
                    <span class="tab-label">{cat.name}</span>
                </button>
            {/each}
        </div>

        <!-- Movies Grid -->
        <div class="category-movies">
            {#key activeCategory}
                <div class="movies-grid">
                    {#each categories[activeCategory].movies as movie (movie.id)}
                        <MovieCard {movie} />
                    {/each}
                </div>
            {/key}
        </div>
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
        border-color: var(--tab-color);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    }

    .tab-icon {
        font-size: 1.1rem;
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
