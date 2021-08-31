<template>
  <v-form v-model="valid" class="text-center">
    <v-alert v-if="errors" dense text type="error">
      {{ errors }}
    </v-alert>

    <v-text-field
      v-model="user.email"
      class="py-2"
      :rules="formRules.email"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
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
      @click.prevent="logUser()"
    >
      Se connecter
    </v-btn>
  </v-form>
  <!--     <form class="container">
				<div v-if="errors"> {{ errors }} </div>
				<div class="form-floating mb-3">
						<input v-model="user.email" type="email" id="email" class="form-control" placeholder="email@example.com"  
								required>
						<label for="email" class="form-label">Email</label>
				</div>
				<div class="form-floating mb-3">
						<input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" 
								required>
						<label for="password" class="form-label">Mot de passe</label>
				</div>

				<input @click.prevent="logUser()" type="submit" class="btn w-100 btn-primary py-2" value="se connecter">

		</form> -->
</template>


<script>
import { ref } from "@vue/composition-api";

export default {
  name: "FormLogin",

  setup(context, { root }) {
    const store = root.$store; // access to store in setup()
    const router = root.$router;

    let valid = ref(null);
    let errors = ref(null);

    const formRules = {
      email: [(v) => !!v || "Ce champs est requis"],
      password: [(v) => !!v || "Ce champs est requis"],
    };

    let user = {
      email: "",
      password: "",
    };
    /* let errors = ref(null); */

    const logUser = () => {
      store
        .dispatch("postData", { endpoint: "/auth/login", data: user })
        .then((res) => {
          if (res.error && res.error === "Incorrect Password") {
            console.log("pas bon mp");
            errors.value = "Ce mot de passe est incorrect";
          }
          if (res.error && res.error === "This account does not exist") {
            errors.value = "Cet utilisateur n'existe pas";
          }
          if (res.token) {
            router.push({ name: "Dashboard" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      user,
      logUser,
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