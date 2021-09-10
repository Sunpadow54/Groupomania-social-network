<template>
	<section class="container">
		<h1 class="text-h4 text-end">Votre Profil</h1>
		<h2 class="text-h5 my-5 text-capitalize font-weight-black text-center">
            {{ user.lastname + ' ' + user.firstname  }}
        </h2>

		<v-card>
			<v-card-title>
                <v-icon color="primary" class="mr-2">mdi-account-edit</v-icon>
                <h2 class="text-h5">Modifier son profil</h2> 
            </v-card-title>

			<v-form v-model="valid" class="text-center pa-5">
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
            <v-card-actions class="justify-end">
                <Delete :mode="mode" />
            </v-card-actions>
            
		</v-card>
	</section>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import Delete from "@/components/Delete.vue";

export default {
	name: "Profile",
    props: ["mode"],
    components: { Delete },
	setup(context, { root, emit }) {
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
				(v) => !!v || "Veuillez confirmer",
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w@\-%]{5,}$/.test(v) ||
					"Ce mot de passe n'est pas valide",
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
                    // errors
					if (res.error && res.error === "This email already exist") {
						errors.value = "Cet email est déjà utilisé";
					}
                    if (res.error && res.error === "Incorrect Password") {
                        errors.value = "Ce mot de passe est incorrect";
                    }
					// success
                    if (res.message) {
                        store.commit('changeUsername', newUser.value.firstname + ' ' + newUser.value.lastname); // change to new name in state
                        emit("switchMode", 'dashboard'); // redirect
                    }

				})
				.catch((err) => { console.log(err) });
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
