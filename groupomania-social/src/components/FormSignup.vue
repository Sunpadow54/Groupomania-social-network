<template>
  <v-form v-model="valid" class="text-center">
    <v-alert v-if="errors" dense text type="error">
      {{ errors }}
    </v-alert>

    <v-text-field
      v-model="newUser.firstname"
      class="py-2"
      :rules="formRules.name"
      label="Prénom"
      required
    ></v-text-field>

    <v-text-field
      v-model="newUser.lastname"
      class="py-2"
      :rules="formRules.name"
      label="Nom"
      required
    ></v-text-field>

    <v-text-field
      v-model="newUser.email"
      class="py-2"
      :rules="formRules.email"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="newUser.password"
      class="py-2"
      :rules="formRules.password"
      label="password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="secondary"
      type="submit"
      class="ma-2 px-5"
      @click.prevent="addUser()"
    >
      S'inscrire
    </v-btn>
  </v-form>
  <!--     <form class="container">

				<div class="form-floating mb-3">
						<input v-model="newUser.email" type="email" id="email" class="form-control" placeholder="email@example.com"  
								required>
						<label for="email" class="form-label">Email</label>

				</div>
				<div class="form-floating mb-3">
						<input v-model="newUser.lastname" type="text" id="lastname" class="form-control" placeholder="" 
								required>
						<label for="lastname" class="form-label">Nom</label>
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

				</div>
				
				<input @click.prevent="addUser()" type="submit" class="btn w-100 btn-primary py-2" value="S'inscrire">
		</form> -->
</template>


<script>
import { ref } from "@vue/composition-api";
//import { useStore } from 'vuex'

export default {
  name: "FormSignup",

  setup(context, { root, emit }) {
    const store = root.$store; // access to store in setup()

    let newUser = {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
    };

    let valid = ref(null);
    let errors = ref(null);

    const formRules = {
      name: [(v) => !!v || "Ce champs est requis"],
      email: [
        (v) => !!v || "Ce champs est requis",
        (v) => /.+@.+/.test(v) || "Adresse mail non valide",
      ],
      password: [
        (v) => !!v || "Ce champs est requis",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(v) ||
          "Le mot de passe doit contenir au moins une majuscule, et un chiffre",
      ],
    };

    const addUser = () => {
      store
        .dispatch("postData", { endpoint: "/auth/signup", data: newUser })
        .then((res) => {
          if (res.error && res.error === "This email already exist") {
            errors.value = "Cet email est déjà utilisé";
          }
          if (res.message) {
            // return to login
            emit("switchToLog", true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      newUser,
      addUser,
      formRules,
      valid,
      errors,
    };
  },
};
</script>

<style scoped>
input[type="submit"] {
  background-color: var(--brand-color-primary);
}
input[type="submit"]:active,
button[type="submit"]:hover {
  background-color: var(--brand-color-secondary);
}
input:invalid {
  border: 1px solid var(--brand-color-secondary);
}
</style>
