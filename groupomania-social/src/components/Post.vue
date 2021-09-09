<template>
	<section class="container-fluid">
		<h1 class="text-h5 my-6 mx-4 mx-md-0">publication & commentaires</h1>
		<!-- Post -->
		<v-card elevation="2" class="mb-5 d-sm-flex overflow-hidden">
			<!-- Post -->
			<v-sheet tile elevation="1" class="overflow-hidden order-2" width="100%">
				<!-- Post top -->
				<v-card-text class="d-flex align-center pa-2">
					<h2 class="body-1 me-3 text-capitalize">
						{{ post.author }}
					</h2>
					<span class="ma-0 text-caption text--disabled">
						le {{ post.date }}
					</span>
					<v-icon
						v-if="post.nbrComment >= 5"
						color="secondary"
						class="ml-auto"
					>
						mdi-fire
					</v-icon>
				</v-card-text>
				<!-- Post title -->
				<v-card-title class="pa-2">
					{{ post.title }}
				</v-card-title>
				<v-card-text>
					{{ post.content }}
				</v-card-text>
				<!-- Post image -->
				<v-img
					:src="post.img"
					width="100%"
					max-height="580"
					contain
					class="mb-4"
				></v-img>
				<v-divider></v-divider>
				<!-- Post actions -->
				<v-card-actions class="justify-end">
					<!-- Author Edit ? -->
					<v-btn
						v-if="post.id_user === $store.state.userId"
						@click="switchMode('editPost')"
						class="mr-2"
						color="blue-grey"
						small
						rounded
						outlined
					>
						<v-icon left> mdi-square-edit-outline</v-icon>
						Edit
					</v-btn>
					<!-- Author Delete ? -->
					<Delete
						v-if="post.id_user === $store.state.userId"
						:postId="postId"
						v-on:switchMode="switchMode"
					/>
					<!-- Admin moderate ? -->
					<v-btn
						v-if="$store.state.isAdmin"
						@click="moderate('posts', post.id_post)"
						color="secondary"
						small
						rounded
						outlined
					>
						modérer la publication
					</v-btn>
				</v-card-actions>
			</v-sheet>
			<!-- Vote pannel -->
			<Vote
				:likes="post.likes"
				:dislikes="post.dislikes"
				:postId="postId"
				:userVote="post.userVote"
			/>
		</v-card>

		<!-- Comment Space -->
		<v-sheet class="pa-3 mt-5" color="primary_light">
			<!-- Create Comment -->
			<v-card color="primary_light" elevation="0" class="mb-3">
				<v-card-actions>
					<v-icon large color="white">mdi-message-text</v-icon>
					<v-btn
						small
						color="primary"
						class="ml-auto"
						@click="show = !show"
					>
						<v-icon v-if="show">mdi-close</v-icon>
						<span v-if="!show">Commenter</span>
					</v-btn>
				</v-card-actions>
				<v-expand-transition>
					<div v-show="show">
						<v-divider></v-divider>
						<CreateComment
							:postId="postId"
							v-on:addComment="addComment"
						/>
					</div>
				</v-expand-transition>
			</v-card>

			<!-- All Comments -->
			<v-card
				v-for="(comment, index) in post.comments"
				:key="index"
				tile
				elevation="0"
				class="mb-3"
			>
				<v-card-text class="d-flex align-center pa-2">
					<h2 class="body-1 me-3 text-capitalize">
						{{ comment.author }}
					</h2>
					<span class="ma-0 text-caption text--disabled">
						le {{ comment.date }}
					</span>
				</v-card-text>
				<v-card-text>
					{{ comment.content }}
				</v-card-text>
				<v-card-actions>
					<v-btn
						v-if="$store.state.isAdmin"
						@click="moderate('comment', comment.id_comment)"
						color="secondary"
						class="ml-auto"
						x-small
						outlined
					>
						modérer le commentaire
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-sheet>
	</section>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import CreateComment from "@/components/CreateComment.vue";
import Delete from "@/components/Delete.vue";
import Vote from "@/components/Vote.vue";

export default {
	name: "Post",
	components: { CreateComment, Delete, Vote },
	props: ["postId"],

	setup(context, { root, emit }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		let post = ref(null);
		let show = ref(false);

		/* functions */
		// Create Post
		const getPost = () => {
			store
				.dispatch("getData", `/posts/${context.postId}`)
				.then((postFetched) => {
					post.value = {
						...postFetched,
						date: formatDate(postFetched.date),
					};
				})
				.catch((err) => console.log(err));
		};

		const formatDate = (datePost) => {
			const date = datePost.split(" ");
			return date[0] + " à " + date[1];
		};

		// Edit Post
		const switchMode = (mode) => {
			emit("switchMode", mode);
		};

		// new comment ?
		function addComment(commentAdded) {
			this.show = !this.show;
            post.value.comments.unshift(commentAdded);
		}

		// Admin moderate Post
		const moderate = (msgType, id) => {
			store
				.dispatch("editData", {
					endpoint: `/${msgType}/${id}/moderate`,
					data: false,
					file: false,
				})
				.then(() => {
					// if admin moderate a post => redirect to admin
					if (msgType === "posts") {
						return switchMode("admin");
					}
					// if it was a comment => re-render comments
					getPost();
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
			show,
			switchMode,
			addComment,
			moderate,

		};
	},
};
</script>
