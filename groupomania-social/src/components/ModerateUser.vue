<template>
	<div class=" d-flex flex-column pa-3 grey lighten-4">
		<v-btn 
            small
            v-if="isActiveMember"
            color="secondary align-self-end mb-3"
            @click.prevent="toogleBanUser()"
        >
			bannir Utilisateur
		</v-btn>
        <v-btn 
            small
            v-if="!isActiveMember"
            color="primary align-self-end mb-3"
            @click.prevent="toogleBanUser()"
        >
			rétablir Utilisateur
		</v-btn>

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
	props: ["userId", "isActiveMember"],
	setup(props, { root, emit }) {
		const store = root.$store; // access to store in setup()
		const bannedPosts = ref(null);
		const thisUserId = props.userId;

		// Function Fetch all unactive post/comments
		const getAllUnactiveMsg = () => {
			store
				.dispatch("getData", `/admin/users/${thisUserId}`)
				.then((data) => {
					bannedPosts.value = data;
				})
				.catch((err) => console.log(err));
		};

        // function to ban or unban user
        const toogleBanUser = () => {
            store
                .dispatch("editData", {
                    endpoint: `/admin/users/${thisUserId}/ban`,
                    data: false,
                    file: false
                })
                .then(() => {
                    emit("hasBeenModerated") // send info that user has been moderated
                })
                .catch(err => console.log(err));
        };

		// Render
		onMounted(() => {
			getAllUnactiveMsg();
		});
        
		/* return data */
		return {
			bannedPosts,
            toogleBanUser,
		};
	},
};
</script>
