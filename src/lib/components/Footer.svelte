<footer class="site-footer">
    <div class="footer-inner">
        <div class="footer-top">
            <div class="footer-brand">
                <img src="/logos/logo-no-bg.png" alt="Dinamic Movies" class="footer-logo" />
                <p class="footer-tagline">Tu guía definitiva para el mundo del cine y el entretenimiento.</p>
            </div>
            <div class="footer-links-group">
                <div class="footer-col">
                    <h4>Explorar</h4>
                    <a href="/">Películas</a>
                    <a href="/">Series de TV</a>
                    <a href="/">Celebridades</a>
                    <a href="/">Próximos Estrenos</a>
                </div>
                <div class="footer-col">
                    <h4>Comunidad</h4>
                    <a href="/">Contribuir</a>
                    <a href="/">Foros</a>
                    <a href="/">Soporte</a>
                </div>
                <div class="footer-col">
                    <h4>Legal</h4>
                    <a href="/">Términos de Uso</a>
                    <a href="/">Política de Privacidad</a>
                    <a href="/">Contacto</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Dinamic Movies. Todos los derechos reservados.</p>
            <div class="social-links">
                <a href="/" class="social-link" title="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="/" class="social-link" title="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="/" class="social-link" title="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
            </div>
        </div>
    </div>
</footer>

<style>
    .site-footer {
        background: var(--gray-900);
        color: var(--gray-300);
        margin-top: 80px;
    }

    .footer-inner {
        max-width: 1360px;
        margin: 0 auto;
        padding: 60px 24px 28px;
    }

    .footer-top {
        display: flex;
        gap: 60px;
        padding-bottom: 40px;
        border-bottom: 1px solid var(--gray-800);
    }

    .footer-brand {
        flex: 1;
        max-width: 320px;
    }

    .footer-logo {
        height: 90px;
        margin-bottom: 14px;
    }

    .footer-tagline {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--gray-400);
    }

    .footer-links-group {
        display: flex;
        gap: 50px;
        flex: 1;
    }

    .footer-col {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .footer-col h4 {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--white);
        margin-bottom: 4px;
    }

    .footer-col a {
        font-size: 0.88rem;
        color: var(--gray-400);
        transition: color var(--transition-fast);
    }

    .footer-col a:hover {
        color: var(--primary-light);
    }

    .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 24px;
    }

    .footer-bottom p {
        font-size: 0.82rem;
        color: var(--gray-500);
    }

    .social-links {
        display: flex;
        gap: 12px;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--gray-800);
        color: var(--gray-400);
        transition: all var(--transition-fast);
    }

    .social-link:hover {
        background: var(--primary);
        color: var(--white);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .footer-top {
            flex-direction: column;
            gap: 32px;
        }
        .footer-links-group {
            gap: 28px;
            flex-wrap: wrap;
        }
        .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
        }
    }
</style>
