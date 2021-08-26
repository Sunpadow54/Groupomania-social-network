<template>
    <router-view />
</template>





<style>
    /* ---- colors */
    :root {
        --brand-color-primary: #091f43;
        --brand-color-secondary: #d1515a;
    }

    .text-brand-primary {
        color: var(--brand-color-primary);
    }

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    background-color: #858585;
    background: linear-gradient(184deg, #858585 0%, #cccccc 80%);
}

#nav a.router-link-exact-active {
	background-color: var(--brand-color-primary);
    color: #ffff;
    border-color: var(--brand-color-primary) !important;
}
/*
#nav a.router-link-exact-active {
	color: #42b983;
} */
</style>