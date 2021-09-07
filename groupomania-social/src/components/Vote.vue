<template>
	<v-sheet class="d-flex flex-column pa-2 elevation-1">
		<!-- likes -->
		<v-btn @click.prevent="vote('like')" text x-small icon>
			<v-icon :color="colorLikeIcon">
				mdi-thumb-up-outline
			</v-icon>
		</v-btn>
		<span class="text-caption text-center">
			{{ nbrLikes ? nbrLikes : "0" }}
		</span>
		<!-- dislikes -->
		<v-btn @click.prevent="vote('dislike')" text x-small icon>
			<v-icon :color="colorDislikeIcon">
				mdi-thumb-down-outline
			</v-icon>
		</v-btn>
		<span class="text-caption text-center">
			{{ nbrDislikes ? nbrDislikes : "0" }}
		</span>
	</v-sheet>
</template>

<script>
import { onMounted, ref } from "@vue/composition-api";

export default {
	name: "Vote",
	props: ["likes", "dislikes", "postId", "userVote"],
	setup(props, { root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		let colorLikeIcon = ref("");
		let colorDislikeIcon = ref("");
		let nbrLikes = ref(props.likes);
		let nbrDislikes = ref(props.dislikes);
		let oldVote = ref(props.userVote);

		/* functions */
		const vote = (userVote) => {
			store
				.dispatch("postData", {
					endpoint: `/posts/${props.postId}/vote`,
					data: { vote: userVote },
					hasAuth: true,
					file: null,
				})
				.then((dataVote) => {
					getColorIcon(dataVote);
					changeVoteNbr(dataVote);
				})
				.catch((err) => console.log({ err }));
		};

		function changeVoteNbr(vote) {
			switch (vote) {
				case "like":
					if (oldVote.value === null) {
						nbrLikes.value++;
						oldVote.value = vote;
					}
					if (oldVote.value === "dislike") {
						nbrLikes.value++;
						nbrDislikes.value--;
						oldVote.value = vote;
					}

					break;

				case "dislike":
					if (oldVote.value === null) {
						nbrDislikes.value++;
						oldVote.value = vote;
					}
					if (oldVote.value === "like") {
						nbrDislikes.value++;
						nbrLikes.value--;
						oldVote.value = vote;
					}

					break;

				case null:
					if (oldVote.value === "like") {
						nbrLikes.value--;
					}
					if (oldVote.value === "dislike") {
						nbrDislikes.value--;
					}
					oldVote.value = vote;
					break;
			}
		}

		function getColorIcon(vote) {
			if (vote === "like") {
				colorLikeIcon.value = "primary";
				colorDislikeIcon.value = "";
			} else if (vote === "dislike") {
				colorLikeIcon.value = "";
				colorDislikeIcon.value = "secondary";
			} else {
				colorLikeIcon.value = "";
				colorDislikeIcon.value = "";
			}
		}

		// render
		onMounted(() => {
			getColorIcon(props.userVote);
		});

		/* return data */
		return {
			vote,
			colorLikeIcon,
			colorDislikeIcon,
			nbrLikes,
			nbrDislikes,
			oldVote,
		};
	},
};
</script>
