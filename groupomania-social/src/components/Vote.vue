<template>
	<v-sheet class="d-flex flex-column pa-2 elevation-1">
		<!-- likes -->
		<v-btn @click.prevent="vote('like')" text x-small icon>
			<v-icon>mdi-thumb-up-outline</v-icon>
		</v-btn>
		<span class="text-caption text-center">
			{{ likes ? likes : "0" }}
		</span>
		<!-- dislikes -->
		<v-btn @click.prevent="vote('dislike')" text x-small icon>
			<v-icon>mdi-thumb-down-outline</v-icon>
		</v-btn>
		<span class="text-caption text-center">
			{{ dislikes ? dislikes : "0" }}
		</span>
	</v-sheet>
</template>

<script>
export default {
	name: "Vote",
	props: ["likes", "dislikes", "postId"],
	setup(props, { root }) {
		/* variables */
		const store = root.$store; // access to store in setup()

		/* functions */
		const vote = (userVote) => {
			store
				.dispatch("postData", {
					endpoint: `/posts/${props.postId}/vote`,
					data: { vote: userVote },
					hasAuth: true,
					file: null,
				})
				.then((a) => {
					console.log(a);
				})
				.catch(err => console.log({ err }));
		};

		/* return data */
		return {
			vote,
		};
	},
};
</script>
