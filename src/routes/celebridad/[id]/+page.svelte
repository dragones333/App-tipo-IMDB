<script>
    import Nav from "$lib/components/nav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import MovieCard from "$lib/components/MovieCard.svelte";

    let { data } = $props();
    let celebrity = $derived(data.celebrity);
    let credits = $derived(data.credits);
    let movies = $derived(data.movies);
</script>

<svelte:head>
    <title>{celebrity.name} | Dinamic Movies</title>
    <meta name="description" content={celebrity.bio} />
</svelte:head>

<Nav />

<main>
    <section class="celebrity-hero">
        <div class="hero-backdrop" style="background-image: url('{celebrity.photo}')"></div>
        <div class="hero-overlay"></div>

        <div class="section-container hero-content">
            <a href="/" class="back-link">Volver al inicio</a>

            <div class="celebrity-layout">
                <div class="portrait-frame">
                    <img src={celebrity.photo} alt={celebrity.name} />
                </div>

                <div class="celebrity-info">
                    <div class="eyebrow">Detalle de celebridad</div>
                    <h1>{celebrity.name}</h1>

                    <div class="meta-row">
                        {#if celebrity.knownFor}
                            <span>{celebrity.knownFor}</span>
                        {/if}
                        {#if celebrity.dob}
                            <span>{celebrity.dob}</span>
                        {/if}
                        {#if celebrity.popularity}
                            <span>{celebrity.popularity} popularidad</span>
                        {/if}
                    </div>

                    <p class="bio">{celebrity.bio}</p>

                    <div class="stats-row">
                        <div class="stat-pill">
                            <strong>{movies.length}</strong>
                            <span>{movies.length === 1 ? 'pelicula' : 'peliculas'}</span>
                        </div>
                        <div class="stat-pill">
                            <strong>{credits.length}</strong>
                            <span>{credits.length === 1 ? 'credito' : 'creditos'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="detail-section">
        <div class="section-container details-grid">
            <div class="detail-block">
                <div class="block-heading">
                    <h2>Informacion principal</h2>
                    <p>Datos registrados para esta celebridad.</p>
                </div>

                <div class="info-list">
                    <div class="info-item primary-info">
                        <span class="info-label">Nombre</span>
                        <strong>{celebrity.name}</strong>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Nacimiento</span>
                        <strong>{celebrity.dob || 'Sin fecha registrada'}</strong>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Conocido por</span>
                        <strong>{celebrity.knownFor || 'Sin rol registrado'}</strong>
                    </div>

                    <div class="info-item full-info">
                        <span class="info-label">Biografia</span>
                        <strong>{celebrity.bio}</strong>
                    </div>
                </div>
            </div>

            <div class="detail-block">
                <div class="block-heading">
                    <h2>Creditos</h2>
                    <p>
                        {credits.length > 0
                            ? `${credits.length} ${credits.length === 1 ? 'participacion registrada' : 'participaciones registradas'}`
                            : 'Aun no hay creditos registrados'}
                    </p>
                </div>

                {#if credits.length > 0}
                    <div class="credits-list">
                        {#each credits as credit}
                            <a class="credit-item" href={credit.movieId ? `/pelicula/${credit.movieId}` : '/peliculas'}>
                                <div class="credit-icon">
                                    {credit.movie?.slice(0, 1) || '?'}
                                </div>
                                <div class="credit-copy">
                                    <strong>{credit.movie}</strong>
                                    <span>{credit.role || 'Participacion'}</span>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <p class="empty-state">No hay creditos registrados para esta celebridad.</p>
                {/if}
            </div>
        </div>
    </section>

    <section class="filmography-section">
        <div class="section-container">
            <div class="block-heading filmography-heading">
                <h2>Filmografia</h2>
                <p>Peliculas relacionadas con {celebrity.name}.</p>
            </div>

            {#if movies.length > 0}
                <div class="movies-grid">
                    {#each movies as movie (movie.id)}
                        <MovieCard {movie} />
                    {/each}
                </div>
            {:else}
                <p class="empty-state">No hay peliculas registradas para esta celebridad.</p>
            {/if}
        </div>
    </section>
</main>

<Footer />

<style>
    main {
        min-height: 100vh;
    }

    .celebrity-hero {
        position: relative;
        min-height: 720px;
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
        background-position: center 22%;
        transform: scale(1.08);
        filter: blur(12px) saturate(1.08);
        opacity: 0.72;
    }

    .hero-overlay {
        background:
            linear-gradient(90deg, rgba(8, 8, 8, 0.96) 0%, rgba(8, 8, 8, 0.72) 54%, rgba(8, 8, 8, 0.38) 100%),
            linear-gradient(180deg, rgba(8, 8, 8, 0.2) 0%, rgba(8, 8, 8, 0.95) 100%);
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

    .celebrity-layout {
        display: grid;
        grid-template-columns: minmax(220px, 340px) minmax(0, 760px);
        gap: 42px;
        align-items: center;
    }

    .portrait-frame {
        overflow: hidden;
        border-radius: 50%;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
        border: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(255, 255, 255, 0.08);
        aspect-ratio: 1;
    }

    .portrait-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .celebrity-info {
        display: flex;
        flex-direction: column;
        gap: 18px;
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
    .stats-row {
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

    .bio {
        max-width: 720px;
        color: rgba(255, 255, 255, 0.78);
        font-size: 1.05rem;
        line-height: 1.75;
    }

    .stat-pill {
        min-width: 126px;
        padding: 14px 18px;
        border-radius: var(--radius-lg);
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.14);
    }

    .stat-pill strong,
    .stat-pill span {
        display: block;
    }

    .stat-pill strong {
        color: var(--white);
        font-size: 1.5rem;
        line-height: 1;
    }

    .stat-pill span {
        margin-top: 4px;
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.82rem;
        font-weight: 800;
        text-transform: uppercase;
    }

    .detail-section,
    .filmography-section {
        padding: 64px 0 0;
    }

    .filmography-section {
        padding-bottom: 74px;
    }

    .details-grid {
        display: grid;
        grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
        gap: 28px;
    }

    .detail-block {
        border: 1px solid rgba(139, 115, 85, 0.16);
        border-radius: var(--radius-lg);
        padding: 30px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 250, 248, 0.78));
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

    .filmography-heading {
        margin-bottom: 26px;
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

    .primary-info,
    .full-info {
        grid-column: 1 / -1;
    }

    .primary-info {
        background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(255, 255, 255, 0.88));
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

    .credits-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 12px;
    }

    .credit-item {
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

    .credit-item:hover {
        transform: translateY(-2px);
        border-color: rgba(220, 38, 38, 0.22);
        box-shadow: 0 12px 28px rgba(42, 33, 24, 0.08);
    }

    .credit-icon {
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

    .credit-copy strong,
    .credit-copy span {
        display: block;
    }

    .credit-copy strong {
        color: var(--text-primary);
        font-size: 0.98rem;
        line-height: 1.25;
    }

    .credit-copy span {
        margin-top: 5px;
        color: var(--text-secondary);
        font-size: 0.86rem;
        font-weight: 700;
    }

    .movies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 24px;
    }

    .movies-grid :global(.movie-card) {
        width: 100%;
    }

    .empty-state {
        border: 1px solid rgba(139, 115, 85, 0.16);
        border-radius: var(--radius-lg);
        padding: 22px;
        color: var(--text-secondary);
        background: rgba(255, 255, 255, 0.76);
    }

    @media (max-width: 860px) {
        .celebrity-hero {
            min-height: auto;
        }

        .celebrity-layout,
        .details-grid {
            grid-template-columns: 1fr;
        }

        .portrait-frame {
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
