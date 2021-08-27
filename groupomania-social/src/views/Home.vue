<template>
    <div id="auth" class="d-flex flex-column justify-content-center align-items-center bg-dark">
        <div class="rounded bg-light">
            <!-- HEADER -->
            <header id="nav">
                <ul class="nav justify-content-center text-center">
                    <li class="nav-item w-50">
                        <button @click="switchMode"
                            :disabled="mode.login"
                            class="nav-link fw-bold text-brand-primary border border-4 w-100">Connection</button>
                    </li>
                    <li class="nav-item w-50">
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
            <main class="home container-mb mb-5">
                <FormSignup v-on:switchToLog="switchMode" v-if="!mode.login" />
                <FormLogin v-if="mode.login" />
            </main>
        </div>
    </div>
</template>


<script>
    import FormSignup from '@/components/FormSignup.vue'
    import FormLogin from '@/components/FormLogin.vue'
    
    export default {
        name: "Home",
        components: { FormSignup, FormLogin },
        data() {
            return {
                mode: {
                    login: true,
                },
            }
        },
        methods: {
            // switch between Login / signup mode
            switchMode: function (){
                this.mode.login = !this.mode.login ;
            },
        }
    };
</script>


<style scoped>
    #auth {
        min-height: 100%;
    }
    #nav .nav-link:disabled {
        background-color: var(--brand-color-primary);
        color: #ffff;
        border-color: var(--brand-color-primary) !important;
    }
</style>