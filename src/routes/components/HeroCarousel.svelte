<script>
    const featured = [
        {
            id: 1,
            title: "El Último Horizonte",
            subtitle: "Una épica de ciencia ficción que redefine el género",
            year: 2026,
            rating: 9.2,
            genre: "Ciencia Ficción",
            duration: "2h 28min",
            backdrop: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&h=900&fit=crop",
            poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop"
        },
        {
            id: 2,
            title: "Corazones de Otoño",
            subtitle: "El drama romántico más aclamado del año",
            year: 2026,
            rating: 8.7,
            genre: "Romance · Drama",
            duration: "1h 56min",
            backdrop: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop",
            poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
        },
        {
            id: 3,
            title: "Sombras del Silencio",
            subtitle: "El thriller psicológico que nadie vio venir",
            year: 2025,
            rating: 8.9,
            genre: "Thriller · Misterio",
            duration: "2h 12min",
            backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&h=900&fit=crop",
            poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop"
        }
    ];

    let currentSlide = $state(0);
    let interval;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % featured.length;
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + featured.length) % featured.length;
    }

    function goToSlide(i) {
        currentSlide = i;
    }

    $effect(() => {
        interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    });
</script>

<section class="hero" id="hero-section">
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
                    <span class="badge badge-trending">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        Tendencia #1
                    </span>
                    <span class="badge badge-year">{featured[currentSlide].year}</span>
                </div>

                <h1 class="hero-title">{featured[currentSlide].title}</h1>
                <p class="hero-subtitle">{featured[currentSlide].subtitle}</p>

                <div class="hero-meta">
                    <div class="meta-item rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {featured[currentSlide].rating}
                    </div>
                    <span class="meta-divider">|</span>
                    <span class="meta-item">{featured[currentSlide].genre}</span>
                    <span class="meta-divider">|</span>
                    <span class="meta-item">{featured[currentSlide].duration}</span>
                </div>

                <div class="hero-actions">
                    <button class="btn-primary" id="btn-watch-trailer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Ver Tráiler
                    </button>
                    <button class="btn-secondary" id="btn-more-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Más Info
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation arrows -->
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

    <!-- Dots -->
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
</section>

<style>
    .hero {
        position: relative;
        height: 85vh;
        min-height: 550px;
        max-height: 800px;
        overflow: hidden;
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

    .hero-content {
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

    .hero-badges {
        display: flex;
        align-items: center;
        gap: 10px;
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
        letter-spacing: -0.03em;
        line-height: 1.05;
    }

    .hero-subtitle {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
    }

    .hero-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .meta-item.rating {
        color: #fbbf24;
        font-weight: 700;
    }

    .meta-divider {
        color: rgba(255, 255, 255, 0.2);
    }

    .hero-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;
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
        box-shadow: 0 8px 30px rgba(220, 38, 38, 0.45);
    }

    .btn-secondary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        color: var(--white);
        border: 1.5px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-full);
        font-size: 0.95rem;
        font-weight: 600;
        transition: all var(--transition-fast);
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.35);
        transform: translateY(-2px);
    }

    /* Navigation Arrows */
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

    /* Dots */
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
        .hero-actions {
            flex-direction: column;
            align-items: flex-start;
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
