<script>
    let { celeb } = $props();
</script>

<a href="/celebridad/{celeb.id}" class="celeb-card" id="celeb-card-{celeb.id}">
    <div class="avatar-wrapper">
        <img src={celeb.photo} alt={celeb.name} class="avatar" loading="lazy" />
        <div class="avatar-ring"></div>
    </div>
    <div class="celeb-info">
        <h3 class="celeb-name">{celeb.name}</h3>
        <p class="celeb-role">{celeb.knownFor}</p>
    </div>
</a>

<style>
    .celeb-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        cursor: pointer;
        flex-shrink: 0;
        width: 160px;
        padding: 20px 12px;
        border-radius: var(--radius-xl);
        transition: all var(--transition-base);
        text-align: center;
    }

    .celeb-card:hover {
        background: var(--gray-50);
        transform: translateY(-4px);
    }

    .avatar-wrapper {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        transition: transform var(--transition-base);
    }

    .avatar-ring {
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 2.5px solid transparent;
        background: linear-gradient(135deg, var(--primary), var(--brown-400)) border-box;
        -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity var(--transition-base);
    }

    .celeb-card:hover .avatar-ring {
        opacity: 1;
    }

    .celeb-card:hover .avatar {
        transform: scale(1.05);
    }

    .celeb-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .celeb-name {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
        transition: color var(--transition-fast);
    }

    .celeb-card:hover .celeb-name {
        color: var(--primary);
    }

    .celeb-role {
        font-size: 0.8rem;
        color: var(--text-secondary);
    }

    @media (max-width: 600px) {
        .celeb-card {
            width: 130px;
            padding: 14px 8px;
        }
        .avatar-wrapper {
            width: 96px;
            height: 96px;
        }
    }
</style>
