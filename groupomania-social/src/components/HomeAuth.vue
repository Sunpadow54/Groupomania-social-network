<template>
    <!-- HEADER -->
    <header id="nav" class="container">
        <ul class="nav justify-content-center text-center">
            <li class="nav-item w-50 ">
                <button @click="switchMode"
                    :disabled="mode.login"
                    class="nav-link fw-bold text-brand-primary border border-4 w-100">Connection</button>
            </li>
            <li class="nav-item w-50 ">
                <button @click="switchMode"
                    :disabled="!mode.login"
                    class="nav-link fw-bold text-brand-primary border border-4 w-100">Inscription</button>
            </li>
        </ul>
        <div class="container py-5 text-center">
            <img alt="Groupomania_logo" src="../assets/groupomania-logo_black.svg" class="img-fluid" />
            <h1 class="h2 py-4"> Bienvenue sur votre réseau social </h1>

            <h2 class="h3" v-if="mode.login">connectez-vous</h2>
            <h2 class="h3" v-if="!mode.login">inscrivez-vous</h2>
	    </div>
	</header>
    <!-- MAIN formulaire-->
    <main class="home container">
        <form class="container">
            <div class="form-floating mb-3">
                <input type="email" id="email" class="form-control" placeholder="email@example.com" required>
                <label for="email" class="form-label">Email</label>
            </div>
            <!-- start signup only-->
            <div class="form-floating mb-3" v-if="!mode.login">
                <input type="text" id="lastname" class="form-control" placeholder="" required>
                <label for="lastname" class="form-label">Nom</label>
            </div>
            <div class="form-floating mb-3" v-if="!mode.login">
                <input type="text" id="firstname" class="form-control" placeholder="" required>
                <label for="firstname" class="form-label">Prénom</label>
            </div>
            <!-- end signup -->
            <div class="form-floating mb-3">
                <input type="password" id="password" class="form-control" placeholder="Password" required>
                <label for="password" class="form-label">Mot de passe</label>
            </div>
            <input type="submit" class="btn w-100 btn-primary py-2" v-if="mode.login" value="se connecter">
            <input type="submit" class="btn w-100 btn-primary py-2" v-if="!mode.login" value="S'inscrire">
        </form>
	</main>
</template>


<script>
    export default {
        name: "NavAuth",
        data() {
            return {
                mode: {
                    login: true,
                }
            }
        },
        methods: {
            switchMode() {
                this.mode.login = this.mode.login ? false : true;
            },
        }
    };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>    
    #nav .nav-link:disabled {
        background-color: var(--brand-color-primary);
        color: #ffff;
        border-color: var(--brand-color-primary) !important;
    }
    input[type="submit"] {
        background-color: var(--brand-color-primary);
    }
    input[type="submit"]:active, button[type="submit"]:hover {
        background-color: var(--brand-color-secondary)
    }
</style>