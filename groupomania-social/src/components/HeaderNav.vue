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

		<v-btn class="mx-2" small icon color="white">
			<v-icon dark> mdi-plus </v-icon>
		</v-btn>

		<v-btn class="mx-2" small depressed
      color="grey">
			Profil
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: "HeaderNav",
	data() {
		return {
			username: "Machin Truc",
		};
	},
};
</script>

<style scoped>
/* header {
  background-color: #2a2a2e;
} */
</style>
