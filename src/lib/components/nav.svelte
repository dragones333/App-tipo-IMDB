<script>
    let scrolled = $state(false);
    let mobileOpen = $state(false);

    function handleScroll() {
        scrolled = window.scrollY > 15;
    }

    function toggleMenu() {
        mobileOpen = !mobileOpen;
    }
</script>

<svelte:window onscroll={handleScroll} />

<nav class:scrolled>
    <div class="nav-container">

        <!-- LOGO -->
        <a href="/" class="logo">
            <img src="/logos/logo.png" alt="CineVault" />
            <span>CineVault</span>
        </a>

        <!-- LINKS -->
        <div class:show-mobile={mobileOpen} class="nav-links">
            <a href="/" class="active">Inicio</a>
            <a href="/peliculas">Películas</a>
            <a href="/#categorias">Categorías</a>
            <a href="/celebridades">Celebridades</a>
        </div>

        <!-- ACTIONS -->
        <div class="actions">
            

            

            <button class="menu-btn" onclick={toggleMenu}>
                ☰
            </button>
        </div>

    </div>
</nav>

<style>
:global(body){
    margin:0;
    font-family:'Inter',sans-serif;
}

/* NAVBAR */
nav{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:1000;
    transition:.3s ease;
    background:rgba(10,10,10,.55);
    backdrop-filter:blur(16px);
    border-bottom:1px solid rgba(255,255,255,.08);
}

nav.scrolled{
    background:rgba(8,8,8,.92);
    box-shadow:0 10px 30px rgba(0,0,0,.35);
}

/* CONTAINER */
.nav-container{
    max-width:1400px;
    margin:auto;
    height:78px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 28px;
    gap:25px;
}

/* LOGO */
.logo{
    display:flex;
    align-items:center;
    gap:10px;
    text-decoration:none;
    color:white;
    font-size:1.2rem;
    font-weight:700;
}

.logo img{
    width:42px;
    height:42px;
    object-fit:contain;
}

.logo span{
    background:linear-gradient(90deg,#ff3c3c,#ff8a00);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}

/* LINKS */
.nav-links{
    display:flex;
    gap:8px;
}

.nav-links a{
    text-decoration:none;
    color:#d4d4d4;
    padding:10px 16px;
    border-radius:999px;
    font-size:.95rem;
    transition:.25s;
}

.nav-links a:hover{
    color:white;
    background:rgba(255,255,255,.08);
}

.nav-links a.active{
    color:white;
    background:linear-gradient(90deg,#ff3c3c,#ff6a00);
}

/* ACTIONS */
.actions{
    display:flex;
    align-items:center;
    gap:12px;
}

/* SEARCH */
.search{
    display:flex;
    align-items:center;
    gap:8px;
    padding:10px 16px;
    border-radius:999px;
    background:rgba(255,255,255,.07);
    border:1px solid rgba(255,255,255,.08);
    width:260px;
}

.search input{
    background:transparent;
    border:none;
    outline:none;
    color:white;
    width:100%;
}

.search input::placeholder{
    color:#aaa;
}

.search svg{
    color:#aaa;
}

/* BUTTON */
.login-btn{
    border:none;
    padding:11px 20px;
    border-radius:999px;
    font-weight:700;
    cursor:pointer;
    color:white;
    background:linear-gradient(90deg,#ff3c3c,#ff7b00);
    transition:.25s;
}

.login-btn:hover{
    transform:translateY(-2px);
    box-shadow:0 8px 20px rgba(255,90,0,.35);
}

/* MENU BTN */
.menu-btn{
    display:none;
    border:none;
    background:none;
    color:white;
    font-size:1.6rem;
    cursor:pointer;
}

/* RESPONSIVE */
@media(max-width:950px){

    .search{
        display:none;
    }

    .menu-btn{
        display:block;
    }

    .nav-links{
        position:absolute;
        top:78px;
        left:0;
        width:100%;
        background:#111;
        flex-direction:column;
        padding:20px;
        display:none;
        gap:10px;
    }

    .nav-links.show-mobile{
        display:flex;
    }

    .nav-links a{
        width:100%;
        text-align:center;
    }
}

@media(max-width:600px){

    .login-btn{
        display:none;
    }

    .logo span{
        display:none;
    }

    .nav-container{
        padding:0 18px;
    }
}
</style>
