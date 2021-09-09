<template>
	<div class=" d-flex flex-column pa-3 primary_light">
		<v-btn 
            small
            :color="isActiveMember ? 'secondary' : 'primary'"
            class="align-self-end mb-3"
            @click.prevent="toogleBanUser()"
        >
			{{ isActiveMember ? 'bannir Utilisateur' : 'rétablir Utilisateur'}}
		</v-btn>
        <h3 class="overline">
            {{ bannedMsg.length === 0 ? "Aucun message modéré" : "Liste des messages modérés:"}}
        </h3>
		<v-card
			v-for="bannedPost in bannedMsg"
			:key="bannedPost.date"
			elevation="0"
			class="mb-2"
            outlined
		>
			<v-container>
				<v-row>
					<v-col>
						<v-card-text class="d-sm-flex align-center pa-2">
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
						<v-card-text>{{ bannedPost.content }}</v-card-text>
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
                        @click.prevent="restoreUserMsg(bannedPost.idPost ? 'posts' : 'comment', bannedPost.idPost || bannedPost.idComment)"
                        color="primary"
                        elevation="2"
                        plain
                        small
                    >
                        Rétablir
                    </v-btn>
				</v-card-actions>
			</v-container>
		</v-card>
	</div>
</template>

<script>
import { onMounted, ref } from "@vue/composition-api";
export default {
	name: "ModerateUser",
	props: ["userId", "isActiveMember", "nbrMsg"],
	setup(props, { root, emit }) {
        /* variables */
		const store = root.$store; // access to store in setup()
		const bannedMsg = ref('');
		const thisUserId = props.userId;

		// Function Fetch all unactive post/comments
		const getAllUnactiveMsg = () => {
			store
				.dispatch("getData", `/admin/users/${thisUserId}`)
				.then((data) => {
                    const allbannedMsg = data.map(bannedPost => ({
                        ...bannedPost,
                        date: formatDate(bannedPost.date)
                    }))
					bannedMsg.value = allbannedMsg;
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
                .then((userIdModerated) => {
                    emit("userBeenModerated", userIdModerated ) // send info that user has been moderated
                })
                .catch(err => console.log(err));
        };

        // function to unmask message
        const restoreUserMsg = (msgType, id) => {
            store
                .dispatch("editData", {
                    endpoint: `/${msgType}/${id}/moderate`,
                    data: false,
                    file: false
                })
                .then((idMsg) => {
                    deleteRestoredMsg(idMsg, msgType);
                    emit("msgBeenModerated", thisUserId)
                })
                .catch(err => console.log(err));
        };

        // function to remove msg restored
        function deleteRestoredMsg(idMsg, msgType) {
            let index;

            if (msgType === 'posts') {
                index = bannedMsg.value.findIndex(msg => msg.idPost == idMsg);
            }
            if (msgType === 'comment') {
                index = bannedMsg.value.findIndex(msg => msg.idComment == idMsg);
            }

            bannedMsg.value.splice(index, 1);
		}

        // function to format msg date
        const formatDate = (dateToFormat) => {
            const date = dateToFormat.split(' ');
            return date[0] + ' à ' + date[1];
        };

		// Render
		onMounted(() => {
			getAllUnactiveMsg();
		});
        
		/* return data */
		return {
			bannedMsg,
            toogleBanUser,
            restoreUserMsg
		};
	},
};
</script>
