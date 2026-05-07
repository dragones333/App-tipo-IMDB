<script>
  import MovieCard from "$lib/components/MovieCard.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  const movies = [
    {
      id: 101,
      title: "Furia Imparable",
      year: 2026,
      rating: 8.3,
      genre: "Acción",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop"
    },
    {
      id: 102,
      title: "Zona de Impacto",
      year: 2025,
      rating: 7.9,
      genre: "Acción",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop"
    },
    {
      id: 103,
      title: "Código Rojo",
      year: 2026,
      rating: 8.5,
      genre: "Acción",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop"
    },
    {
      id: 104,
      title: "Operación Trueno",
      year: 2025,
      rating: 7.6,
      genre: "Acción",
      poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop"
    }
  ];

  let scrollContainer;

  function scrollLeft() {
    scrollContainer.scrollBy({ left: -400, behavior: "smooth" });
  }

  function scrollRight() {
    scrollContainer.scrollBy({ left: 400, behavior: "smooth" });
  }
</script>

<section class="movies-section" id="peliculas">
  <div class="section-container">

    <SectionHeader
      title="Películas"
      subtitle="Descubre lo mejor del momento"
      viewAllHref="/peliculas"
    />

    <div class="carousel-wrapper">

      <button class="scroll-btn left" onclick={scrollLeft}>
        ◀
      </button>

      <div class="movies-scroll" bind:this={scrollContainer}>
        {#each movies as movie (movie.id)}
          <MovieCard {movie} />
        {/each}
      </div>

      <button class="scroll-btn right" onclick={scrollRight}>
        ▶
      </button>

    </div>

  </div>
</section>

<style>
.movies-section {
  padding: 60px 0 0;
}

.carousel-wrapper {
  position: relative;
}

.movies-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: none;
}

.movies-scroll::-webkit-scrollbar {
  display: none;
}

.scroll-btn {
  position: absolute;
  top: 40%;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: white;
  cursor: pointer;
}

.scroll-btn.left {
  left: -10px;
}

.scroll-btn.right {
  right: -10px;
}
</style>
