<template>
	<section class="container">
		<v-card elevation="2" outlined>
			<div class="d-flex">
				<v-sheet
					grow
					outline
					elevation="1"
					tile
					class="order-2 overflow-hidden"
					width="100%"
				>
					<!-- card top -->
					<v-card-text class="d-flex align-center pa-2">
						<h2 class="body-1 me-3 text-capitalize">
							{{ post.author }}
						</h2>
						<span class="ma-0 text-caption text--disabled">
							il y a {{ post.date }}
						</span>
						<v-icon
							v-if="post.nbrComment >= 5"
							color="secondary"
							class="ml-auto"
							>mdi-fire</v-icon
						>
					</v-card-text>
					<!-- card title -->
					<v-card-title class="pa-2">
						{{ post.title }}
					</v-card-title>
					<v-card-text>
						{{ post.content }}
					</v-card-text>
					<!-- </a> -->
					<!-- card image -->
					<v-img :src="post.img" height="330px"></v-img>
				</v-sheet>

				<!-- card likes / dislikes -->
				<v-sheet class="d-flex flex-column pa-2 elevation-1">
					<v-btn x-small icon>
						<v-icon>mdi-thumb-up-outline</v-icon>
					</v-btn>
					<span class="text-caption text-center">
						{{ post.likes ? post.likes : "0" }}
					</span>
					<v-btn x-small icon>
						<v-icon>mdi-thumb-down-outline</v-icon>
					</v-btn>
					<span class="text-caption text-center">
						{{ post.dislikes ? post.dislikes : "0" }}
					</span>
				</v-sheet>
			</div>
		</v-card>

		<!-- Comments -->
		<v-sheet class="pa-3 mt-5" color="primary_light">
			<div class="d-flex mb-5">
				<v-icon large color="white">mdi-message-text</v-icon>
				<v-btn color="primary" class="ml-auto">Commenter</v-btn>
			</div>
			<!-- comment -->
			<v-card
				v-for="comment in post.comments"
				:key="comment.id_comment"
				tile
				elevation="1"
				class="mb-3"
			>
				<v-card-text class="d-flex align-center pa-2">
					<h2 class="body-1 me-3 text-capitalize">
						{{ comment.author }}
					</h2>
					<span class="ma-0 text-caption text--disabled">
						il y a {{ comment.date }}
					</span>
				</v-card-text>
				<v-card-text>
					{{ comment.content }}
				</v-card-text>
			</v-card>
		</v-sheet>
	</section>
</template>


<script>
import { ref, onMounted } from "@vue/composition-api";
export default {
	name: "Post",
	props: ["postId"],
	setup(context, { root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		const post = ref(null);
		console.log(context.postId);

		const getPost = () => {
			store
				.dispatch("getData", `/posts/${context.postId}`)
				.then((postFetched) => {
					post.value = postFetched;
				})
				.catch((err) => console.log(err));
		};

		// Render
		onMounted(() => {
			getPost();
		});
		/*  return data */
		return {
			post,
		};
	},
};
</script>

