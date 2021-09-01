<template>
	<v-app-bar dark color="grey">
		<v-toolbar-title>
			<img
				src="../assets/groupomania-logo_colors.svg"
				alt=""
				width="164"
				height="auto"
			/>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-toolbar-title> {{ userName }} </v-toolbar-title>

		<v-btn
			@click="showCreatePost(true)"
			class="mx-2"
			small
			icon
			color="white"
		>
			<v-icon dark> mdi-plus </v-icon>
		</v-btn>

		<v-btn class="mx-2" small depressed color="grey">
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
		console.log(userName);

		/* functions */
		const showCreatePost = (isShowned) => {
			emit("switchToCreate", isShowned);
		};

		/* return data */
		return {
			showCreatePost,
			userName,
		};
	},
};
</script>
