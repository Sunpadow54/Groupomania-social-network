<template>
    <form class="container">
        <div class="form-floating mb-3">
            <input v-model="newUser.email" type="email" id="email" class="form-control" placeholder="email@example.com"  
                required>
            <label for="email" class="form-label">Email</label>
            <!-- <small class="invalid-feedback"></small> -->
        </div>
        <div class="form-floating mb-3">
            <input v-model="newUser.lastName" type="text" id="lastname" class="form-control" placeholder="" 
                required>
            <label for="lastname" class="form-label">Nom</label>
            <!-- <small class="invalid-feedback"></small> -->
        </div>
        <div class="form-floating mb-3">
            <input v-model="newUser.firstName" type="text" id="firstname" class="form-control" placeholder="" required>
            <label for="firstname" class="form-label">Prénom</label>
            <small class="invalid-feedback"></small>
        </div>
        <div class="form-floating mb-3">
            <input v-model="newUser.password" type="password" id="password" class="form-control" placeholder="Password" 
                required  minlength="5">
            <label for="password" class="form-label">Mot de passe</label>
            <!-- <small class="invalid-feedback"></small> -->
        </div>
        
        <input @click.prevent="addUser()" type="submit" class="btn w-100 btn-primary py-2" value="S'inscrire">

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
        name: "FormSignup",
        props: {
                regex: {
                    pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
                    mail: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                }
        },
        data() {
            return {
                newUser: {
                    email: '',
                    password: '',
                    lastName: '',
                    firstName: ''
                },
                result: '',
                error: [],
            }
        },
        methods: {
            // fetch Post new user
            async addUser() {

                fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newUser)
                })
                    .then(response => response.json())
                    .then(data => { 
                        this.result = data;
                        // redirect
                        this.$router.push({ name: 'Dashboard' });
                    })
                    .catch(err => {
                        this.error = err;
                    });
            },
        }
    };
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
