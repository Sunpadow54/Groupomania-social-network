<template>
    <form class="container">
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

        <div>
            {{ result }}
        </div>
        <div v-if="error.length !== 0">
            {{ error }}
        </div>
    </form>
</template>


<script>
    export default {
        name: "FormLogin",
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                error: [],
            }
        },
        methods: {
            // fetch user to get token
            async logUser() {

                fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                })
                    .then(response => response.json())
                    .then(data => { 
                        this.$router.push({ name: 'Dashboard' }) 
                    })
                    .catch(err => { this.error = err });
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