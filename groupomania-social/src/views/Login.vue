<template>
	<main class="home container">
		<HomeAuth msg="Bienvenue sur votre réseau social" />
        <form class="container">
            <h2 class="h3 text-center">Connectez-vous</h2>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="email@example.com" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="text" id="password" class="form-control"  required>
            </div>
            <button class="btn w-100 btn-primary py-2">se connecter</button>
        </form>
	</main>
</template>

<script>
// @ is an alias to /src
// Import Components
import HomeAuth from "@/components/HomeAuth.vue";


export default {
	name: "Login",
	components: {
		HomeAuth
	},
};
</script>

<style scoped>
    button {
        background-color: var(--brand-color-secondary);
    }
    button:active, button:hover {
        
        background-color: var(--brand-color-primary);
    }

</style>
