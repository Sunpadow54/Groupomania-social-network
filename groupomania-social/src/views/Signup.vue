<template>
    <main class="home container">
        <HomeAuth msg="Bienvenue sur votre réseau social" />
        <form>
            <h2>Inscrivez-vous</h2>
            <label for="email">email</label>
            <input type="email" id="email" required>
            <label for="password">Mot de passe</label>
            <input type="text" id="password" required>
            <label for="firstname">Nom</label>
            <input type="text" id="firstname" required>
            <label for="lastname">Prénom</label>
            <input type="text" id="lastname" required>
            <button>s'inscrire</button>
        </form>
    </main>
</template>

<script>
    // Import Components
    import HomeAuth from "@/components/HomeAuth.vue";

    export default {
        name: "Signup",
        components: {
            HomeAuth
        },
    };
</script>