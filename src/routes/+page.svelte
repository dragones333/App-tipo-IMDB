<script>
    import Nav from "$lib/components/nav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import HeroCarousel from "./components/HeroCarousel.svelte";
    import RecommendedSection from "./components/RecommendedSection.svelte";
    import CategoriesSection from "./components/CategoriesSection.svelte";
    import CelebsSection from "./components/CelebsSection.svelte";
    import PeliculasSection from "./components/PeliculasSection.svelte";
</script>

<svelte:head>
    <title>Dinamic Movies — Tu Guía de Cine y Entretenimiento</title>
    <meta name="description" content="Descubre películas, series, y celebridades. Encuentra recomendaciones personalizadas, explora por categoría y mantente al día con las estrellas del momento." />
</svelte:head>

<Nav />

<main>
    <HeroCarousel />
    <RecommendedSection />
    <CategoriesSection />
    <PeliculasSection /> 
    <CelebsSection />
</main>

<Footer />

<style>
    main {
        padding-top: 0;
    }
</style>