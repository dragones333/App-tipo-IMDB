<script>
    import CelebCard from "$lib/components/CelebCard.svelte";
    import SectionHeader from "$lib/components/SectionHeader.svelte";

    let { celebrities = [] } = $props();

    function getSafeImageUrl(celeb) {
    if (celeb.photo && celeb.photo.trim() !== "") {
        return celeb.photo;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(celeb.name)}&background=random&size=256`;
    }
</script>

<section class="celebs-section" id="celebridades">
    <div class="section-container">
        <div class="section-badge">HOT LIST 2026</div>
        <SectionHeader
            title="Celebridades en Tendencia"
            subtitle="Las estrellas mas populares del momento"
            viewAllHref="/celebridades"
        />

        <div class="celebs-grid">
            {#if celebrities.length > 0}
                {#each celebrities as celeb (celeb.id)}
                    <div class="celeb-wrapper">
                        {#if celeb.trending}
                            <div class="trending-indicator" title="Tendencia hoy">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    <polyline points="17 6 23 6 23 12"></polyline>
                                </svg>
                            </div>
                        {/if}
                        
                        <CelebCard {celeb} imageUrl={getSafeImageUrl(celeb)} />
                    </div>
                {/each}
            {:else}
                <div class="empty-state-container">
                    <p class="empty-state">No hay celebridades registradas.</p>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .celebs-section {
        padding: 72px 0 28px;
        position: relative;
    }

    .celebs-section::before {
        content: '';
        position: absolute;
        inset: 30px 0 0;
        background:
            radial-gradient(circle at 12% 10%, rgba(220, 38, 38, 0.08), transparent 42%),
            linear-gradient(180deg, rgba(253, 248, 246, 0.95) 0%, rgba(255, 255, 255, 0) 100%);
        pointer-events: none;
        z-index: -1;
    }

    .section-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.72rem;
        letter-spacing: 0.16em;
        font-weight: 700;
        color: #b91c1c; 
        background: linear-gradient(90deg, #fff2ec 0%, #ffe8df 100%);
        border: 1px solid #ffd5c6;
        border-radius: 9999px; 
        padding: 8px 12px;
        margin-bottom: 18px;
        box-shadow: 0 10px 30px rgba(220, 38, 38, 0.08);
    }

    .celebs-grid {
        display: flex;
        gap: 14px;
        overflow-x: auto;
        padding: 14px 4px 18px;
        scrollbar-width: none;
        mask-image: linear-gradient(to right, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
    }

    .celebs-grid::-webkit-scrollbar {
        display: none;
    }

    .celeb-wrapper {
        position: relative;
        flex-shrink: 0;
    }

    .empty-state {
        color: #6b7280;
        padding: 24px 0;
        text-align: center;
        width: 100%;
    }

    .trending-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: linear-gradient(145deg, #ef4444, #b91c1c);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.38);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }

    @media (max-width: 768px) {
        .celebs-section {
            padding: 48px 0 20px;
        }

        .section-badge {
            margin-bottom: 14px;
            font-size: 0.66rem;
            letter-spacing: 0.13em;
            padding: 7px 10px;
        }

        .celebs-grid {
            gap: 10px;
            padding: 10px 2px 14px;
            mask-image: none;
        }
    }
</style>