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
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
	name: "FormSignup",

	setup(context, { root, emit }) {
		/* variables */
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

		/* functions */
		const addUser = () => {
			store
				.dispatch("postData", {
					endpoint: "/auth/signup",
					data: JSON.stringify(newUser),
				})
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

		/* setup return */
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
/* input[type="submit"] {
	background-color: var(--brand-color-primary);
}
input[type="submit"]:active,
button[type="submit"]:hover {
	background-color: var(--brand-color-secondary);
}
input:invalid {
	border: 1px solid var(--brand-color-secondary);
} */
</style>
