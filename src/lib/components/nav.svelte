<script>
    let scrolled = $state(false);

    function handleScroll() {
        scrolled = window.scrollY > 20;
    }
</script>

<svelte:window onscroll={handleScroll} />

<nav class:scrolled>
    <div class="nav-inner">
        <a href="/" class="logo-link">
            <img src="/logos/logo.png" alt="CineVault Logo" class="logo-img" />
        </a>

        <div class="nav-links">
            <a href="/" class="nav-link active">Inicio</a>
            <a href="#recomendadas" class="nav-link">Películas</a>
            <a href="#categorias" class="nav-link">Categorías</a>
            <a href="#celebridades" class="nav-link">Celebridades</a>
        </div>

        <div class="nav-actions">
            <div class="search-box" id="nav-search">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" placeholder="Buscar películas, series, celebridades..." />
            </div>
            <button class="btn-login" id="btn-login">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Iniciar Sesión
            </button>
        </div>

        <button class="mobile-menu-btn" id="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</nav>

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        height: 72px;
        display: flex;
        align-items: center;
        transition: background-color var(--transition-base),
                    box-shadow var(--transition-base),
                    backdrop-filter var(--transition-base);
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }

    nav.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.08);
    }

    .nav-inner {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 1360px;
        margin: 0 auto;
        padding: 0 24px;
        gap: 32px;
    }

    .logo-link {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .logo-img {
        height: 44px;
        width: auto;
        object-fit: contain;
        transition: transform var(--transition-fast);
    }

    .logo-link:hover .logo-img {
        transform: scale(1.05);
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .nav-link {
        padding: 8px 16px;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--gray-600);
        border-radius: var(--radius-full);
        transition: all var(--transition-fast);
        white-space: nowrap;
    }

    .nav-link:hover {
        color: var(--primary);
        background-color: var(--red-50);
    }

    .nav-link.active {
        color: var(--primary);
        background-color: var(--red-50);
        font-weight: 600;
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: auto;
    }

    .search-box {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--gray-100);
        border-radius: var(--radius-full);
        padding: 8px 16px;
        border: 1.5px solid transparent;
        transition: all var(--transition-fast);
        min-width: 280px;
    }

    .search-box:focus-within {
        border-color: var(--primary);
        background: var(--white);
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .search-box svg {
        color: var(--gray-400);
        flex-shrink: 0;
    }

    .search-box input {
        border: none;
        background: transparent;
        outline: none;
        font-size: 0.85rem;
        font-family: inherit;
        color: var(--text-primary);
        width: 100%;
    }

    .search-box input::placeholder {
        color: var(--gray-400);
    }

    .btn-login {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 20px;
        background: var(--primary);
        color: var(--white);
        border-radius: var(--radius-full);
        font-size: 0.85rem;
        font-weight: 600;
        transition: all var(--transition-fast);
        white-space: nowrap;
    }

    .btn-login:hover {
        background: var(--primary-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    }

    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        gap: 5px;
        padding: 8px;
        background: transparent;
    }

    .mobile-menu-btn span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--gray-700);
        border-radius: 2px;
        transition: all var(--transition-fast);
    }

    @media (max-width: 900px) {
        .nav-links,
        .search-box {
            display: none;
        }

        .mobile-menu-btn {
            display: flex;
        }

        .btn-login span {
            display: none;
        }
    }

    @media (max-width: 600px) {
        .btn-login {
            padding: 8px 12px;
            font-size: 0;
        }

        .btn-login svg {
            margin: 0;
        }
    }
</style>