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
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
	name: "FormLogin",

	setup(context, { root }) {
		/* variables */
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

		/* logique */
		const logUser = () => {
			store
				.dispatch("postData", { 
                    endpoint: "/auth/login", 
                    data: user, 
                    hasAuth: false,
                    file: false
                })
				.then((res) => {
					if (res.error && res.error === "Incorrect Password") {
						console.log("pas bon mp");
						errors.value = "Ce mot de passe est incorrect";
					}
					if (
						res.error &&
						res.error === "This account does not exist"
					) {
						errors.value = "Cet utilisateur n'existe pas";
					}
					if (res.token) {
						// mutate state
						store.commit("auth_success", res);
						// redirect
						if (store.state.token) {
							router.push({ name: "Dashboard" });
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		/* setup return */
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
