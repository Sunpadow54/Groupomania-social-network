<template>
    <HomeAuth/>
</template>


<script>
    // Import Components
    import HomeAuth from "@/components/HomeAuth.vue";
    // export
    export default {
        name: "Home",
        components: { HomeAuth },

    };
</script>

<style scoped>
    button {
        background-color: var(--brand-color-primary);
    }
    button:active, button:hover {
        background-color: var(--brand-color-secondary)
    }
</style>