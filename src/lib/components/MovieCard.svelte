<script>
    let { movie } = $props();
</script>

<a href="/pelicula/{movie.id}" class="movie-card" id="movie-card-{movie.id}">
    <div class="poster-wrapper">
        <img src={movie.poster} alt={movie.title} class="poster" loading="lazy" />
        <div class="poster-overlay">
            <div class="overlay-actions">
                <button class="btn-icon" title="Agregar a lista">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
                <button class="btn-play" title="Ver trailer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </button>
            </div>
        </div>
        {#if movie.rating}
            <div class="rating-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {movie.rating}
            </div>
        {/if}
    </div>
    <div class="card-info">
        <h3 class="movie-title">{movie.title}</h3>
        <div class="movie-meta">
            <span class="year">{movie.year}</span>
            {#if movie.genre}
                <span class="dot">·</span>
                <span class="genre">{movie.genre}</span>
            {/if}
        </div>
    </div>
</a>

<style>
    .movie-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        cursor: pointer;
        flex-shrink: 0;
        width: 200px;
    }

    .poster-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 2/3;
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--gray-100);
    }

    .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
    }

    .movie-card:hover .poster {
        transform: scale(1.08);
    }

    .poster-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.1) 40%,
            transparent 100%
        );
        opacity: 0;
        transition: opacity var(--transition-base);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 16px;
    }

    .movie-card:hover .poster-overlay {
        opacity: 1;
    }

    .overlay-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .btn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(8px);
        color: white;
        transition: all var(--transition-fast);
    }

    .btn-icon:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }

    .btn-play {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        transition: all var(--transition-fast);
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
    }

    .btn-play:hover {
        background: var(--primary-hover);
        transform: scale(1.1);
    }

    .btn-play svg {
        margin-left: 2px;
    }

    .rating-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        border-radius: var(--radius-full);
        color: #fbbf24;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .card-info {
        padding: 0 4px;
    }

    .movie-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color var(--transition-fast);
    }

    .movie-card:hover .movie-title {
        color: var(--primary);
    }

    .movie-meta {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        color: var(--text-secondary);
        margin-top: 2px;
    }

    .dot {
        color: var(--gray-300);
    }

    @media (max-width: 600px) {
        .movie-card {
            width: 150px;
        }
    }
</style>
