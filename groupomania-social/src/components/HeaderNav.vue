<template>
	<v-app-bar dark color="grey">
		<v-toolbar-title class="align-self-center">
            <v-btn
                @click="showCreatePost(false)"
            >
                <img
                    src="../assets/groupomania-logo_colors.svg"
                    alt=""
                    width="164"
                    height="auto"
                />
            </v-btn>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-toolbar-title class="mr-2 align-self-center"> {{ userName }} </v-toolbar-title>

		<v-btn
			@click="showCreatePost(true)"
			class="mx-2 align-self-center"
			small
			icon
			color="white"
		>
			<v-icon dark> mdi-plus </v-icon>
		</v-btn>

		<v-btn class="mx-2 align-self-center" small depressed color="grey">
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
