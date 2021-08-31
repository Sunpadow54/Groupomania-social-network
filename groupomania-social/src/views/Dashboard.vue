<template>
    <div>
    <HeaderNav />
    <main class="container">
        <AllPosts />
    </main>
    </div>
</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'
    import AllPosts from '@/components/AllPosts.vue'

    export default {
        name: "Dashboard",
        components: { HeaderNav, AllPosts},
    }
    
</script>

<style scoped>
    main {
        max-width:1000px;
        margin-top: 65px;
    }
</style>