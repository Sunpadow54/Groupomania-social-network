<template>
	<div class=" d-flex flex-column pa-3 grey lighten-4">
		<v-btn 
            small
            color="secondary align-self-end mb-3"
            @click.prevent="banUser()"
        >
			ban utilisateur
		</v-btn>
		<!--         <v-list-item v-for="bannedPost in bannedPosts" :key="bannedPost.date">
 -->
		<v-card
			v-for="bannedPost in bannedPosts"
			:key="bannedPost.date"
			elevation="0"
			class="mb-2"
            outlined
		>
			<v-container>
				<v-row>
					<v-col>
						<v-card-text class="d-flex align-center pa-2">
							<h3 class="text-overline me-3">
								{{
									bannedPost.idPost
										? "publication"
										: "commentaire"
								}}
							</h3>
							<span class="ma-0 text-caption text--disabled">
								le {{ bannedPost.date }}
							</span>
						</v-card-text>
						<v-card-text color="primary">{{ bannedPost.content }}</v-card-text>
					</v-col>
					<v-col cols="auto">
						<v-avatar
							v-show="bannedPost.img"
							color="primary"
							size="128"
							tile
						>
							<v-img :src="bannedPost.img" width="128"></v-img>
						</v-avatar>
					</v-col>
				</v-row>
				<v-card-actions class="justify-end">
					<v-btn
                      color="primary"
                        elevation="2"
                        plain
                        small
                    >
                    unban</v-btn>
				</v-card-actions>
			</v-container>
		</v-card>
		<!-- </v-list-item> -->
	</div>
</template>

<script>
import { onMounted, ref } from "@vue/composition-api";
export default {
	name: "ModerateUser",
	props: ["userId"],
	setup(props, { root }) {
		const store = root.$store; // access to store in setup()
		const bannedPosts = ref(null);
		const userId2 = props.userId;

		// Function Fetch all unactive post/comments
		const getAllUnactiveMsg = () => {
			store
				.dispatch("getData", `/admin/users/${userId2}`)
				.then((data) => {
					bannedPosts.value = data;
				})
				.catch((err) => console.log(err));
		};

        const banUser = () => {

        }

		// Render
		onMounted(() => {
			getAllUnactiveMsg();
		});

		/* return data */
		return {
			bannedPosts,
            banUser
		};
	},
};
</script>
