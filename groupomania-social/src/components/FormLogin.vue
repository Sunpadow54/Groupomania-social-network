<template>
    <form class="container">
        <div v-if="errors"> {{ errors }} </div>
        <div class="form-floating mb-3">
            <input v-model="user.email" type="email" id="email" class="form-control" placeholder="email@example.com"  
                required>
            <label for="email" class="form-label">Email</label>
            <!-- <small class="invalid-feedback"></small> -->
        </div>
        <div class="form-floating mb-3">
            <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" 
                required>
            <label for="password" class="form-label">Mot de passe</label>
            <!-- <small class="invalid-feedback"></small> -->
        </div>

        <input @click.prevent="logUser()" type="submit" class="btn w-100 btn-primary py-2" value="se connecter">

    </form>
</template>


<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'

    export default {
        name: "FormLogin",

        setup() {
            const store = useStore();

            let user = {
                email: '',
                password: ''
            };
            let errors = ref(null);

            const logUser = () => {
                store.dispatch('postData', { endpoint:'/auth/login', data: user })
                    .then(res => {
                        if(res.error) {
                            throw res.error
                        }
                        if (res.token) { 
                            this.$router.push({ name: 'Dashboard' }) 
                        }
                    })
                    .catch(err => { errors.value = err } );
            };

            return {
                user,
                logUser,
                errors
            }
        }
    }
</script>


<style scoped>
    input[type="submit"] {
        background-color: var(--brand-color-primary);
    }
    input[type="submit"]:active, button[type="submit"]:hover {
        background-color: var(--brand-color-secondary);
    }
    input:invalid {
        border:1px solid var(--brand-color-secondary);
    }
</style>