<template>
	<v-form v-model="valid" class="text-center pa-5">
		<v-textarea
			v-model="commentToSend.comment.content"
			:rules="rule"
			class="py-2"
			label="Votre Commentaire ..."
			type="text"
			outlined
			required
		></v-textarea>

		<v-btn
			:disabled="!valid"
			color="secondary"
			type="submit"
			class="ma-2 px-5"
			@click.prevent="createComment()"
		>
			Envoyer
		</v-btn>
	</v-form>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
	name: "CreateComment",
	props: ["postId"],
	setup(props, { root, emit }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		let valid = ref(null);
		const rule = [(v) => !!v || "Ce champs est requis"];

		let commentToSend = {
			userId: store.state.userId,
			comment: {
				content: '',
				postId: props.postId,
			},
		};


        /* functions */
		const createComment = () => {
			store
				.dispatch("postData", {
					endpoint: "/comment",
					data: commentToSend,
					hasAuth: true,
					file: null,
				})
				.then((idComment) => {
                    let newComment = {
                        id_comment: idComment,
                        author:store.state.username,
                        date: new Date().toLocaleString(),
                        content: commentToSend.comment.content
                    }
                    // add the newly created comment
                    emit('addComment', newComment)
                })
				.catch((err) => console.log({ err }));
		};

		/* return data */
		return {
			valid,
			rule,
			createComment,
			commentToSend,
		};
	},
};
</script>
