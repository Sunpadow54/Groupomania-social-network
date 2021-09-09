<template>
	<section class="container-fluid">
		<h1 class="body-1 my-6 mx-4 mx-md-0">dernières publications</h1>
		<!-- All Posts -->
		<v-card
			v-for="post in posts"
			v-bind:key="post.id_post"
			elevation="2"
			class="mb-5 d-sm-flex overflow-hidden"
		>
            <!-- Post -->
            <v-card
                tile
                elevation="1"
                class="overflow-hidden order-2"
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
                    <div class="ml-auto">
                        <v-icon
                            v-if="post.nbrComment >= 5"
                            color="secondary"
                            class="ml-auto"
                            >mdi-fire
                        </v-icon>
                        <v-icon
                            v-if="post.likes >= 5"
                            color="primary lighten-4"
                            class="ml-auto"
                            small
                            >mdi-heart-multiple
                        </v-icon>
                    </div>
                </v-card-text>
                <!-- card title -->
                <v-card-title
                    @click.prevent="goToPost(post.id_post, 'onePost')"
                    class="pa-2 cursor-point"
                >
                    {{ post.title }}
                </v-card-title>
                <!-- card image -->
                <v-img :src="post.img" width="100%" max-height="450px"></v-img>
                <!-- card bottom -->
                <v-card-subtitle
                    @click="goToPost(post.id_post, 'onePost')"
                    class="pa-2 cursor-point"
                >
                    <v-icon>mdi-message-outline</v-icon>
                    <span class="mr-2">
                        {{
                            post.nbrComment
                                ? post.nbrComment === 1
                                    ? `1 commentaire`
                                    : `${post.nbrComment} commentaires`
                                : "0 commentaire"
                        }}
                    </span>
                    <v-icon v-if="post.latestCom" class="body-1">
                        mdi-subdirectory-arrow-right
                    </v-icon>
                    <span class="text-caption">{{ post.latestCom }}</span>
                </v-card-subtitle>
            </v-card>
            
            <!-- Vote pannel -->
            <Vote 
                :likes="post.likes" 
                :dislikes="post.dislikes" 
                :postId="post.id_post"
                :userVote="post.userVote"
            />
		</v-card>
	</section>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import Vote from "@/components/Vote.vue";

export default {
	name: "AllPosts",
    components: { Vote },

	setup(context, { root, emit }) {
		const store = root.$store; // access to store in setup()
		const posts = ref(null);

		// Function Fetch Post
		const getAllPosts = () => {
			store
				.dispatch("getData", "/posts")
				.then((data) => {
					// change date into time passed
					let data2 = data.map((el) => {
						return {
							...el,
							latestCom: passedTime(el.latestCom),
							date: passedTime(el.date),
						};
					});
					posts.value = data2;
				})
				.catch((err) => console.log(err));
		};

		// Function Calc the time passed
		const passedTime = (datePost) => {
			// if no comments
			if (!datePost) {
				return null;
			}

			// format datePost
			let date = datePost.split(/[/ :]/);
			let endDate = new Date(
				date[2],
				date[1] - 1,
				date[0],
				date[3],
				date[4],
				date[5]
			);

			// Calc
			let now = new Date();

			const sec = 1000;
			const min = 60 * sec;
			const hour = 60 * min;
			const day = hour * 24;
			const year = day * 365;

			const diffTime = now.getTime() - endDate.getTime();

			let findDiff = (time) => {
				return Math.round(diffTime / time);
			};

			// return the good string of time passed
			if (findDiff(year) > 0) {
				let diff = findDiff(year);
				return `${diff} ${diff === 1 ? "an" : "ans"}`;
			}
			if (findDiff(day) > 0) {
				return `${findDiff(day)} j`;
			}
			if (findDiff(hour) > 0) {
				return `${findDiff(hour)} h`;
			}
			if (findDiff(min) > 0) {
				return `${findDiff(min)} min`;
			}
			if (findDiff(sec) > 0) {
				return `${findDiff(sec)} sec`;
			}
		};

		// functions from parent
		const goToPost = (postId, mode) => {
			emit("getPostId", postId);
			emit("switchMode", mode);
		};

		// Render
		onMounted(() => {
			getAllPosts();
		});

		return {
			posts,
			goToPost,
		};
	},
};
</script>