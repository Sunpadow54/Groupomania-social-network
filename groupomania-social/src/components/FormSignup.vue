<template>

    <form class="container">
        <div v-if="errors"> {{ Object.values(error)  }} </div>
        <div class="form-floating mb-3">
            <input v-model="newUser.email" type="email" id="email" class="form-control" placeholder="email@example.com"  
                required>
            <label for="email" class="form-label">Email</label>

            <!-- <small class="invalid-feedback"></small> -->
        </div>
        <div class="form-floating mb-3">
            <input v-model="newUser.lastname" type="text" id="lastname" class="form-control" placeholder="" 
                required>
            <label for="lastname" class="form-label">Nom</label>
            <!-- <small class="invalid-feedback"></small> -->
        </div>
        <div class="form-floating mb-3">
            <input v-model="newUser.firstname" type="text" id="firstname" class="form-control" placeholder="" required>
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
    </form>
</template>


<script>
    import { ref, getCurrentInstance,} from 'vue'
    import { useStore } from 'vuex'

    export default {
        name: "FormSignup",

        setup(context) {
            const store = useStore();

            let newUser = {
                email: '',
                password: '',
                lastname: '',
                firstname: ''
            };

            let errors = ref(null);

            const addUser = () => { 
                store.dispatch('postData', { endpoint:'/auth/signup', data: newUser })
                    .then(res => {
                        if (res.error) { throw res }
                        // return to login
                        context.emit('switchToLog');
                    })
                    .catch(err => {  errors.value = err });
            };
            
            return {
                newUser,
                addUser,
                errors,
                props
            }
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
