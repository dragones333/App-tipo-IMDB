<script>
    import CelebCard from "$lib/components/CelebCard.svelte";
    import SectionHeader from "$lib/components/SectionHeader.svelte";
    let { celebrities = [
        {
            id: 1,
            name: "Alejandro Montero",
            knownFor: "Actor · Director",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            trending: true
        },
        {
            id: 2,
            name: "Valentina Reyes",
            knownFor: "Actriz · Productora",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
            trending: true
        },
        {
            id: 3,
            name: "Ricardo Fuentes",
            knownFor: "Actor",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
            trending: false
        },
        {
            id: 4,
            name: "Camila Herrera",
            knownFor: "Actriz · Modelo",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
            trending: true
        },
        {
            id: 5,
            name: "Daniel Espinoza",
            knownFor: "Actor",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            trending: false
        },
        {
            id: 6,
            name: "Isabella Torres",
            knownFor: "Actriz · Directora",
            photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
            trending: true
        },
        {
            id: 7,
            name: "Mateo García",
            knownFor: "Director · Guionista",
            photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
            trending: false
        },
        {
            id: 8,
            name: "Sofía Delgado",
            knownFor: "Actriz",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
            trending: true
        }
    ]} = $props();

</script>

<section class="celebs-section" id="celebridades">
    <div class="section-container">
        <SectionHeader
            title="Celebridades en Tendencia"
            subtitle="Las estrellas más populares del momento"
            viewAllHref="/celebridades"
        />

        <div class="celebs-grid">
            {#each celebrities as celeb (celeb.id)}
                <div class="celeb-wrapper">
                    {#if celeb.trending}
                        <div class="trending-indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        </div>
                    {/if}
                    <CelebCard {celeb} />
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .celebs-section {
        padding: 72px 0 20px;
    }

    .celebs-grid {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 8px 0 16px;
        scrollbar-width: none;
    }

    .celebs-grid::-webkit-scrollbar {
        display: none;
    }

    .celeb-wrapper {
        position: relative;
        flex-shrink: 0;
    }

    .trending-indicator {
        position: absolute;
        top: 14px;
        right: 14px;
        z-index: 2;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
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
    }
</style>
