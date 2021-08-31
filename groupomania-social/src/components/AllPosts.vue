<template>
	<section class="container">
		<h2 class="body-1 mb-6">dernières publications</h2>

		<!-- All Posts -->
		<v-card
			v-for="post in posts"
			v-bind:key="post.idPost"
			elevation="2"
			outlined
			class="mb-5"
		>
			<div class="d-flex">
				<!-- <v-tab-item> -->
				<v-card elevation="1" tile class="order-2 flex-shrink-1 flex-grow-0 overflow-hidden">
                    <!-- card top -->
					<v-card-text class="d-flex align-center pa-2">
						<h3 class="body-1 me-3 text-capitalize">
							{{ post.author }}
						</h3>
						<span class="ma-0 text-caption text--disabled">
                            il y a {{ post.date }}
                        </span>
						<v-icon v-if="post.nbrComment >= 5" color="secondary" class="ml-auto">mdi-fire</v-icon>
					</v-card-text>
                    <!-- card title -->
					<a class="text-decoration-none text-dark" href="#">
                        <v-card-title class="pa-2">
                            {{ post.title }}
                        </v-card-title>
					</a>
                    <!-- card image -->
					<v-img
						src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
						height="330px"
					></v-img>
                    <!-- card bottom -->
					<a href="" class="text--disabled text-decoration-none">
						<v-card-subtitle class="pa-2">
							<v-icon>mdi-message-outline</v-icon>
							<span class="mr-2">
                                {{
                                    post.nbrComment ?
                                        post.nbrComment === 1 ? 
                                            `1 commentaire` : `${post.nbrComment} commentaires`
                                        : "0 commentaire"
                                }}
							</span>
							<v-icon v-if="post.latestCom" class="body-1">mdi-subdirectory-arrow-right</v-icon>
							<span class="text-caption">{{ post.latestCom }}</span>
						</v-card-subtitle>
					</a>
				</v-card>

				<!-- card likes / dislikes -->
				<div class="d-flex flex-column ma-2">
					<v-btn x-small icon>
						<v-icon>mdi-thumb-up-outline</v-icon>
					</v-btn>
					<span class="text-caption text-center">{{ post.likes ? post.likes : "0" }}</span>
					<v-btn x-small icon>
						<v-icon>mdi-thumb-down-outline</v-icon>
					</v-btn>
				</div>
			</div>
		</v-card>
	</section>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";

export default {
	name: "AllPosts",

	setup(context, { root }) {
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

		// Render
		onMounted(() => {
			getAllPosts();
		});

		return {
			posts,
		};
	},
};
</script>

<style scoped></style>
