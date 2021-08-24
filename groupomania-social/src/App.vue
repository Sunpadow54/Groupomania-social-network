<template>
        <Home />
<!-- 	<header id="nav" class="container">
        <ul class="nav justify-content-center text-center">
            <li class="nav-item w-50 "><router-link to="/login" class="nav-link fw-bold text-brand-primary border border-4">Connection</router-link></li>
            <li class="nav-item w-50 "><router-link to="/signup" class="nav-link fw-bold text-brand-primary border border-4">Inscription</router-link></li>
        </ul>
	</header>
    <router-view /> -->
</template>


<script>
    // Import Components
    import Home from "@/views/Home.vue";

    // export
    export default {
        components: { Home },
    };
</script>


<style>
    /* ---- colors */
    :root {
        --brand-color-primary: #091f43;
        --brand-color-secondary: #d1515a ;
    }

    .text-brand-primary {
        color: var(--brand-color-primary);
    }

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
}

#nav a.router-link-exact-active {
	background-color: var(--brand-color-primary);
    color: #ffff;
    border-color: var(--brand-color-primary) !important;
}


/* 
#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
} */
</style>