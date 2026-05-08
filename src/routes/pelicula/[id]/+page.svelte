<script>
    import Nav from "$lib/components/nav.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let { data } = $props();
    let movie = $derived(data.movie);
    let cast = $derived(data.cast);
</script>

<svelte:head>
    <title>{movie.title} | Dinamic Movies</title>
    <meta name="description" content={movie.synopsis} />
</svelte:head>

<Nav />

<main>
    <section class="movie-hero">
        <div class="hero-backdrop" style="background-image: url('{movie.backdrop}')"></div>
        <div class="hero-overlay"></div>

        <div class="section-container hero-content">
            <a href="/" class="back-link">Volver al inicio</a>

            <div class="movie-layout">
                <div class="poster-frame">
                    <img src={movie.poster} alt={movie.title} />
                </div>

                <div class="movie-info">
                    <div class="eyebrow">Detalle de pelicula</div>
                    <h1>{movie.title}</h1>

                    <div class="meta-row">
                        {#if movie.year}
                            <span>{movie.year}</span>
                        {/if}
                        {#if movie.duration}
                            <span>{movie.duration}</span>
                        {/if}
                        {#if movie.releaseDate}
                            <span>{movie.releaseDate}</span>
                        {/if}
                    </div>

                    {#if movie.genres.length > 0}
                        <div class="genre-list">
                            {#each movie.genres as genre}
                                <span>{genre}</span>
                            {/each}
                        </div>
                    {/if}

                    <p class="synopsis">{movie.synopsis}</p>

                    <div class="actions">
                       
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="detail-section">
        <div class="section-container details-grid">
            <div class="detail-block">
                <div class="block-heading">
                    <h2>Detalles de la pelicula</h2>
                    <p>Datos principales registrados en la base de datos.</p>
                </div>

                <div class="info-list">
                    <div class="info-item primary-info">
                        <span class="info-label">Director</span>
                        <strong>{movie.director || 'Sin director registrado'}</strong>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Estreno</span>
                        <strong>{movie.releaseDate || 'Sin fecha registrada'}</strong>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Duracion</span>
                        <strong>{movie.duration || 'Sin duracion registrada'}</strong>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Categorias</span>
                        <strong>{movie.genres.length > 0 ? movie.genres.join(', ') : 'Sin categorias'}</strong>
                    </div>
                </div>
            </div>

            <div class="detail-block">
                <div class="block-heading">
                    <h2>Creditos y reparto</h2>
                    <p>
                        {cast.length > 0
                            ? `${cast.length} ${cast.length === 1 ? 'participacion registrada' : 'participaciones registradas'}`
                            : 'Aun no hay participaciones registradas'}
                    </p>
                </div>

                {#if cast.length > 0}
                    <div class="cast-list">
                        {#each cast as person}
                            <div class="cast-item">
                                <div class="cast-avatar">
                                    {person.name?.slice(0, 1) || '?'}
                                </div>
                                <div class="cast-copy">
                                    <strong>{person.name}</strong>
                                    <span>{person.role || 'Participacion'}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <p class="empty-state">No hay reparto registrado para esta pelicula.</p>
                {/if}
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    main {
        min-height: 100vh;
    }

    .movie-hero {
        position: relative;
        min-height: 760px;
        color: var(--white);
        overflow: hidden;
        background: #111;
    }

    .hero-backdrop,
    .hero-overlay {
        position: absolute;
        inset: 0;
    }

    .hero-backdrop {
        background-size: cover;
        background-position: center;
        transform: scale(1.04);
        filter: saturate(1.05);
    }

    .hero-overlay {
        background:
            linear-gradient(90deg, rgba(8, 8, 8, 0.94) 0%, rgba(8, 8, 8, 0.72) 48%, rgba(8, 8, 8, 0.36) 100%),
            linear-gradient(180deg, rgba(8, 8, 8, 0.3) 0%, rgba(8, 8, 8, 0.95) 100%);
    }

    .hero-content {
        position: relative;
        z-index: 2;
        padding-top: 124px;
        padding-bottom: 72px;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        margin-bottom: 30px;
        color: rgba(255, 255, 255, 0.76);
        font-weight: 700;
        transition: color var(--transition-fast);
    }

    .back-link:hover {
        color: var(--white);
    }

    .movie-layout {
        display: grid;
        grid-template-columns: minmax(220px, 340px) minmax(0, 720px);
        gap: 42px;
        align-items: end;
    }

    .poster-frame {
        overflow: hidden;
        border-radius: var(--radius-lg);
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.08);
        aspect-ratio: 2 / 3;
    }

    .poster-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .movie-info {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding-bottom: 12px;
    }

    .eyebrow {
        width: fit-content;
        padding: 7px 12px;
        border-radius: var(--radius-full);
        background: var(--primary);
        color: var(--white);
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    h1 {
        max-width: 760px;
        color: var(--white);
        font-size: 4rem;
        font-weight: 900;
    }

    .meta-row,
    .genre-list,
    .actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .meta-row span {
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.96rem;
        font-weight: 700;
    }

    .meta-row span:not(:last-child)::after {
        content: "|";
        color: rgba(255, 255, 255, 0.26);
        margin-left: 10px;
    }

    .genre-list span {
        padding: 7px 13px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.84);
        font-size: 0.86rem;
        font-weight: 700;
    }

    .synopsis {
        max-width: 720px;
        color: rgba(255, 255, 255, 0.76);
        font-size: 1.05rem;
        line-height: 1.75;
    }

    .btn-primary,
    .btn-secondary {
        padding: 14px 24px;
        border-radius: var(--radius-full);
        font-size: 0.94rem;
        font-weight: 800;
        transition: all var(--transition-fast);
    }

    .btn-primary {
        background: var(--primary);
        color: var(--white);
        box-shadow: 0 8px 28px rgba(220, 38, 38, 0.34);
    }

    .btn-primary:hover {
        background: var(--primary-hover);
        transform: translateY(-2px);
    }

    .btn-secondary {
        color: var(--white);
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }

    .detail-section {
        padding: 64px 0 74px;
    }

    .details-grid {
        display: grid;
        grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
        gap: 28px;
    }

    .detail-block {
        border: 1px solid rgba(139, 115, 85, 0.16);
        border-radius: var(--radius-lg);
        padding: 30px;
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 250, 248, 0.78));
        box-shadow: 0 16px 40px rgba(42, 33, 24, 0.08);
    }

    .block-heading {
        display: grid;
        gap: 7px;
        margin-bottom: 22px;
    }

    .block-heading h2 {
        color: var(--text-primary);
        font-size: 1.55rem;
        line-height: 1.1;
        position: relative;
        padding-left: 14px;
    }

    .block-heading h2::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.14em;
        width: 4px;
        height: 0.95em;
        border-radius: var(--radius-full);
        background: var(--primary);
    }

    .block-heading p {
        color: var(--text-secondary);
        font-size: 0.92rem;
        font-weight: 600;
        line-height: 1.45;
    }

    .info-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }

    .info-item {
        min-height: 104px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        padding: 18px;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.82);
        border: 1px solid rgba(139, 115, 85, 0.14);
    }

    .primary-info {
        grid-column: 1 / -1;
        background:
            linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(255, 255, 255, 0.88));
        border-color: rgba(220, 38, 38, 0.18);
    }

    .info-label {
        color: var(--text-secondary);
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .info-item strong {
        color: var(--text-primary);
        font-size: 1rem;
        line-height: 1.35;
    }

    .cast-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 12px;
    }

    .cast-item {
        display: flex;
        align-items: center;
        gap: 13px;
        min-height: 78px;
        padding: 14px;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.84);
        border: 1px solid rgba(139, 115, 85, 0.14);
        transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    .cast-item:hover {
        transform: translateY(-2px);
        border-color: rgba(220, 38, 38, 0.22);
        box-shadow: 0 12px 28px rgba(42, 33, 24, 0.08);
    }

    .cast-avatar {
        width: 46px;
        height: 46px;
        flex: 0 0 46px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(145deg, var(--primary), #ff8a5c);
        color: var(--white);
        font-size: 1rem;
        font-weight: 900;
        box-shadow: 0 8px 18px rgba(220, 38, 38, 0.2);
    }

    .cast-copy strong,
    .cast-copy span {
        display: block;
    }

    .cast-copy strong {
        color: var(--text-primary);
        font-size: 0.98rem;
        line-height: 1.25;
    }

    .cast-copy span {
        margin-top: 5px;
        color: var(--text-secondary);
        font-size: 0.86rem;
        font-weight: 700;
    }

    .empty-state {
        color: var(--text-secondary);
    }

    @media (max-width: 860px) {
        .movie-hero {
            min-height: auto;
        }

        .movie-layout,
        .details-grid {
            grid-template-columns: 1fr;
        }

        .poster-frame {
            max-width: 260px;
        }

        h1 {
            font-size: 2.6rem;
        }
    }

    @media (max-width: 560px) {
        .hero-content {
            padding-top: 104px;
        }

        h1 {
            font-size: 2.1rem;
        }

        .detail-block {
            padding: 22px;
        }

        .info-list {
            grid-template-columns: 1fr;
        }
    }
</style>
