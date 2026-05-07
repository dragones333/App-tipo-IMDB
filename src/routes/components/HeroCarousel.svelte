<script>
    let { featured = [] } = $props();
    let currentSlide = $state(0);
    let interval;

    function nextSlide() {
        if (featured.length === 0) return;
        currentSlide = (currentSlide + 1) % featured.length;
    }

    function prevSlide() {
        if (featured.length === 0) return;
        currentSlide = (currentSlide - 1 + featured.length) % featured.length;
    }

    function goToSlide(i) {
        currentSlide = i;
    }

    $effect(() => {
        if (featured.length <= 1) {
            return;
        }

        interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    });
</script>

<section class="hero" id="hero-section">
    {#if featured.length > 0}
        {#each featured as movie, i}
            <div
                class="hero-slide"
                class:active={i === currentSlide}
                style="background-image: url('{movie.backdrop}')"
            >
                <div class="slide-overlay"></div>
            </div>
        {/each}

        <div class="hero-content">
            <div class="hero-inner section-container">
                <div class="hero-text">
                    <div class="hero-badges">
                        <span class="badge badge-trending">Tendencia #1</span>
                        {#if featured[currentSlide].year}
                            <span class="badge badge-year">{featured[currentSlide].year}</span>
                        {/if}
                    </div>

                    <h1 class="hero-title">{featured[currentSlide].title}</h1>
                    <p class="hero-subtitle">{featured[currentSlide].subtitle}</p>

                    <div class="hero-meta">
                        {#if featured[currentSlide].rating}
                            <div class="meta-item rating">{featured[currentSlide].rating}</div>
                            <span class="meta-divider">|</span>
                        {/if}
                        {#if featured[currentSlide].genre}
                            <span class="meta-item">{featured[currentSlide].genre}</span>
                            <span class="meta-divider">|</span>
                        {/if}
                        {#if featured[currentSlide].duration}
                            <span class="meta-item">{featured[currentSlide].duration}</span>
                        {/if}
                    </div>

                    <div class="hero-actions">
                        <a class="btn-primary" href="/pelicula/{featured[currentSlide].id}">
                            Ver detalles
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {#if featured.length > 1}
            <button class="hero-nav hero-prev" onclick={prevSlide} aria-label="Anterior">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button class="hero-nav hero-next" onclick={nextSlide} aria-label="Siguiente">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            <div class="hero-dots">
                {#each featured as _, i}
                    <button
                        class="dot"
                        class:active={i === currentSlide}
                        onclick={() => goToSlide(i)}
                        aria-label="Ir a slide {i + 1}"
                    >
                        <span class="dot-progress"></span>
                    </button>
                {/each}
            </div>
        {/if}
    {:else}
        <div class="hero-empty section-container">
            <h1 class="hero-title">Dinamic Movies</h1>
            <p class="hero-subtitle">Agrega peliculas desde la API para mostrarlas aqui.</p>
        </div>
    {/if}
</section>

<style>
    .hero {
        position: relative;
        height: 85vh;
        min-height: 550px;
        max-height: 800px;
        overflow: hidden;
        background: #111;
    }

    .hero-slide {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transform: scale(1.1);
        transition: opacity 1s ease, transform 6s ease;
    }

    .hero-slide.active {
        opacity: 1;
        transform: scale(1);
    }

    .slide-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to right,
            rgba(10, 10, 10, 0.88) 0%,
            rgba(10, 10, 10, 0.6) 40%,
            rgba(10, 10, 10, 0.2) 70%,
            transparent 100%
        );
    }

    .hero-content,
    .hero-empty {
        position: relative;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .hero-inner {
        width: 100%;
    }

    .hero-text {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .hero-badges,
    .hero-meta,
    .hero-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .badge {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 14px;
        border-radius: var(--radius-full);
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    .badge-trending {
        background: var(--primary);
        color: var(--white);
    }

    .badge-year {
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(8px);
        color: var(--white);
        border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .hero-title {
        font-size: 3.5rem;
        font-weight: 900;
        color: var(--white);
        line-height: 1.05;
    }

    .hero-subtitle {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
    }

    .hero-meta {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
    }

    .meta-item.rating {
        color: #fbbf24;
        font-weight: 700;
    }

    .meta-divider {
        color: rgba(255, 255, 255, 0.2);
    }

    .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        background: var(--primary);
        color: var(--white);
        border-radius: var(--radius-full);
        font-size: 0.95rem;
        font-weight: 700;
        transition: all var(--transition-fast);
        box-shadow: 0 4px 20px rgba(220, 38, 38, 0.35);
    }

    .btn-primary:hover {
        background: var(--primary-hover);
        transform: translateY(-2px);
    }

    .hero-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        border: 1px solid rgba(255, 255, 255, 0.1);
        opacity: 0;
    }

    .hero:hover .hero-nav {
        opacity: 1;
    }

    .hero-nav:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
    }

    .hero-prev {
        left: 24px;
    }

    .hero-next {
        right: 24px;
    }

    .hero-dots {
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dot {
        width: 40px;
        height: 4px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.25);
        overflow: hidden;
        position: relative;
        transition: width var(--transition-base);
    }

    .dot.active {
        width: 56px;
    }

    .dot-progress {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0;
        background: var(--primary);
        border-radius: var(--radius-full);
    }

    .dot.active .dot-progress {
        animation: dotFill 6s linear forwards;
    }

    @keyframes dotFill {
        from { width: 0; }
        to { width: 100%; }
    }

    @media (max-width: 768px) {
        .hero {
            height: 75vh;
            min-height: 480px;
        }
        .hero-title {
            font-size: 2.2rem;
        }
        .hero-subtitle {
            font-size: 0.95rem;
        }
        .hero-nav {
            display: none;
        }
        .slide-overlay {
            background: linear-gradient(
                to top,
                rgba(10, 10, 10, 0.95) 0%,
                rgba(10, 10, 10, 0.6) 50%,
                rgba(10, 10, 10, 0.3) 100%
            );
        }
        .hero-text {
            margin-top: auto;
            padding-bottom: 60px;
        }
        .hero-content {
            align-items: flex-end;
        }
    }
</style>
