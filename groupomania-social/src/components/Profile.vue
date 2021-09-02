<template>
	<section class="container">
		<h2>Votre Profil</h2>
		<p>{{ user.lastname }}</p>
		<p>{{ user.firstname }}</p>
		<v-card>
			<v-card-title> <h3>Modifier son profil</h3> </v-card-title>

			<v-form v-model="valid" class="text-center pa-5">
				<v-alert v-if="errors" dense text type="error">
					{{ errors }}
				</v-alert>

				<v-text-field
					v-model="newUser.firstname"
					class="py-2"
					:rules="formRules.name"
					label="Prénom"
					aria-placeholder="newUser.firstname"
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

				<v-card-text>Veuillez confirmer vos modifications</v-card-text>
				<v-text-field
					v-model="newUser.password"
					class="py-2"
					:rules="formRules.password"
					label="mot de passe"
					type="password"
					required
				></v-text-field>

				<v-btn
					:disabled="!valid"
					color="secondary"
					type="submit"
					class="ma-2 px-5"
					@click.prevent="editUser()"
				>
					Modifier
				</v-btn>
			</v-form>
		</v-card>
	</section>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
export default {
	name: "Profile",
	setup(context, { root }) {
		/* Variables */
		const store = root.$store; // access to store in setup()
		const userId = store.state.userId;

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

		let user = ref(null);
		let newUser = ref(null);

		/* Functions */
		const showUser = () => {
			store
				.dispatch("getData", `/profile/${userId}`)
				.then((userFetched) => {
					user.value = userFetched;
					newUser.value = {
						email: userFetched.email,
						lastname: userFetched.lastname,
						firstname: userFetched.firstname,
						password: "",
					};
				})
				.catch((err) => console.log(err));
		};

		const editUser = () => {
			store
				.dispatch("editData", {
					endpoint: `/profile/${userId}`,
					data: newUser.value,
					file: false,
				})
				.then((res) => {
					if (res.error && res.error === "This email already exist") {
						errors.value = "Cet email est déjà utilisé";
					}
					if (res.message) {
						// return to login
						console.log(res);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		// Render
		onMounted(() => {
			showUser();
		});

		/* return render */
		return {
			user,
			newUser,
			valid,
			errors,
			formRules,
			editUser,
		};
	},
};
</script>
