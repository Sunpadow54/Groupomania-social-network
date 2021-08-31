<template>
    <div>
        <HeaderNav v-on:switchToCreate="switchCreate" />
        <main class="container">
            <AllPosts v-if="!modeCreatePost" />
            <CreatePost v-if="modeCreatePost" />
        </main>
    </div>
</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'
    import AllPosts from '@/components/AllPosts.vue'
    import CreatePost from '@/components/CreatePost.vue'

    export default {
        name: "Dashboard",
        components: { HeaderNav, AllPosts, CreatePost},
        data() {
            return {
                modeCreatePost: false
            }
        },
        methods: {
            switchCreate: function (isShowned) {
                this.modeCreatePost = isShowned;
            }
        },
    }
    
</script>

<style scoped>
    main {
        max-width:900px;
    }
    div {
        background-color: #ebedf0;
    }
</style>