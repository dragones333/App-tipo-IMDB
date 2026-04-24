<script>
    let { title, subtitle = '', viewAllHref = '', viewAllText = 'Ver todo' } = $props();
</script>

<div class="section-header">
    <div class="header-left">
        <h2 class="section-title">{title}</h2>
        {#if subtitle}
            <p class="section-subtitle">{subtitle}</p>
        {/if}
    </div>
    {#if viewAllHref}
        <a href={viewAllHref} class="view-all-link">
            {viewAllText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </a>
    {/if}
</div>

<style>
    .section-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 28px;
    }

    .header-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .section-title {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--text-primary);
        letter-spacing: -0.02em;
        position: relative;
        padding-left: 16px;
    }

    .section-title::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 70%;
        background: var(--primary);
        border-radius: var(--radius-full);
    }

    .section-subtitle {
        font-size: 0.95rem;
        color: var(--text-secondary);
        padding-left: 16px;
    }

    .view-all-link {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--primary);
        white-space: nowrap;
        padding: 6px 12px;
        border-radius: var(--radius-full);
        transition: all var(--transition-fast);
    }

    .view-all-link:hover {
        background: var(--red-50);
    }

    .view-all-link:hover svg {
        transform: translateX(3px);
    }

    .view-all-link svg {
        transition: transform var(--transition-fast);
    }

    @media (max-width: 600px) {
        .section-title {
            font-size: 1.35rem;
        }
        .section-subtitle {
            font-size: 0.85rem;
        }
    }
</style>
