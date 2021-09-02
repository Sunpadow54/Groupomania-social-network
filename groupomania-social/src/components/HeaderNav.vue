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

		<v-toolbar-title class="mr-2 align-self-center text-capitalize">
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
export default {
	name: "HeaderNav",

	setup(context, { emit, root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		const userName = store.state.username;

		/* functions */
		const switchMode = (isShowned) => {
			emit("switchMode", isShowned);
		};

		/* return data */
		return {
			switchMode,
			userName,
		};
	},
};
</script>
