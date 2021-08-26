<template>
    <header class="navbar fixed-top">
        <nav class="container-fluid ">
                <a class="navbar-brand" href="#">
                    <img src="../assets/groupomania-logo_colors.svg" alt="" width="164" height="35" class="d-inline-block align-text-top">
                </a>
                <ul class="nav align-items-center">
                    <li><h2 class="h4 nav-link m-0 text-light">{{ username }}</h2></li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="#">Profil</a>
                    </li>
                </ul>
        </nav>
    </header>
</template>


<script>
    export default {
        name: 'HeaderNav',
        data() {
            return {
                username: "Machin Truc",
            }
        }
    }
</script>


<style scoped>
    header {
        background-color: #2a2a2e;
    }
</style>