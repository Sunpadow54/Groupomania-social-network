<template>
	<v-app-bar dark color="grey">
		<v-toolbar-title class="align-self-center">
			<v-btn @click="switchMode('dashboard')">
				<img
					src="../assets/groupomania-logo_colors.svg"
					alt=""
					width="164"
					height="auto"
				/>
			</v-btn>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-toolbar-title v-model="userName" class="mr-2 align-self-center text-capitalize">
			{{ userName }}
		</v-toolbar-title>

		<v-btn
			@click="switchMode('createPost')"
			class="mx-2 align-self-center"
			small
			icon
			color="white"
		>
			<v-icon dark> mdi-plus </v-icon>
		</v-btn>

		<v-btn
			class="mx-2 align-self-center"
			small
			depressed
			color="grey"
			@click="switchMode('profile')"
		>
			Profil
		</v-btn>
	</v-app-bar>
</template>

<script>
import { ref, watch, } from "@vue/composition-api";
export default {
	name: "HeaderNav",

	setup(props, { emit, root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		let userName = ref(store.state.username);

        // watch change made from updating account username
        watch(() => store.state.username, () => {
            userName.value = store.getters.getUsername;
        })
        
		/* functions */
		const switchMode = (mode) => {
			emit("switchMode", mode);
		};

		/* return data */
		return {
			switchMode,
			userName,
		};
	},

};
</script>
