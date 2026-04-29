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
        width: 168px;
        padding: 18px 12px 16px;
        border-radius: 22px;
        transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base), background var(--transition-base);
        text-align: center;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(252, 248, 246, 0.86));
        border: 1px solid rgba(139, 115, 85, 0.18);
        box-shadow: 0 12px 28px rgba(42, 33, 24, 0.08);
    }

    .celeb-card:hover {
        transform: translateY(-6px) scale(1.01);
        border-color: rgba(220, 38, 38, 0.35);
        box-shadow: 0 18px 36px rgba(42, 33, 24, 0.15);
        background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 244, 240, 0.92));
    }

    .avatar-wrapper {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
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
        inset: -2px;
        border-radius: 50%;
        border: 2.5px solid transparent;
        background: linear-gradient(135deg, var(--primary), #ff9a6a) border-box;
        -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        opacity: 0.45;
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
        gap: 4px;
    }

    .celeb-name {
        font-size: 0.98rem;
        font-weight: 700;
        color: var(--text-primary);
        transition: color var(--transition-fast);
        letter-spacing: -0.01em;
    }

    .celeb-card:hover .celeb-name {
        color: var(--primary);
    }

    .celeb-role {
        font-size: 0.78rem;
        color: var(--text-secondary);
        line-height: 1.3;
    }

    @media (max-width: 600px) {
        .celeb-card {
            width: 136px;
            padding: 14px 8px;
        }
        .avatar-wrapper {
            width: 96px;
            height: 96px;
        }
    }
</style>
