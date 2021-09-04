<template>
	<section class="container">
        <h2>Post & comments</h2>
		<!-- Post -->
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
					<!-- Post top -->
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
						>
                            mdi-fire
                        </v-icon>
                        <!-- Post actions -->
                        <v-card-actions 
                            v-if="post.id_user === $store.state.userId"
                            class="ml-auto"
                        >
                            <!-- Edit ? -->
                            <v-btn
                                @click="switchMode('editPost')"
                                color="primary"
                                class="mr-2"
                                x-small
                                outlined
                            >
                                Edit
                            </v-btn>
                            <!-- Delete ? -->
                            <Delete 
                                :postId="postId" 
                                v-on:switchMode="switchMode" 
                            />
                        </v-card-actions>
					</v-card-text>
					<!-- Post title -->
					<v-card-title class="pa-2">
						{{ post.title }}
					</v-card-title>
					<v-card-text>
						{{ post.content }}
					</v-card-text>
					<!-- Post image -->
					<v-img :src="post.img" height="330px"></v-img>
				</v-sheet>

				<!-- Post likes / dislikes -->
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
						<CreateComment :postId="postId" />
					</div>
				</v-expand-transition>
			</v-card>

			<!-- All Comments -->
			<v-card
				v-for="comment in post.comments"
				:key="comment.id_comment"
				tile
				elevation="0"
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
import CreateComment from "@/components/CreateComment.vue";
import Delete from "@/components/Delete.vue";

export default {
	name: "Post",
	components: { CreateComment, Delete },
	props: ["postId"],

	setup(context, { root, emit }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		const post = ref(null);
		const show = false;

        /* function */
        // Create Post
		const getPost = () => {
			store
				.dispatch("getData", `/posts/${context.postId}`)
                    .then((postFetched) => {
                        post.value = postFetched;
                    })
                    .catch((err) => console.log(err));
		};

        // Edit Post
		const switchMode = (mode) => {
			emit("switchMode", mode);
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
		};
	},
};
</script>
