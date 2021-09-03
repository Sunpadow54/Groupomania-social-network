<template>
	<v-card>
		<v-card-title v-if="mode === 'createPost'"> Créer un nouveau Post </v-card-title>
        <v-card-title v-if="mode === 'editPost'"> Modifier son Post </v-card-title>


		<v-form v-model="valid" class="text-center pa-5">
			<v-text-field
				v-model="post.title"
				:rules="rule"
				class="py-2"
				label="Titre"
				type="text"
				required
			></v-text-field>

			<v-textarea
				v-model="post.content"
				:rules="rule"
				class="py-2"
				label="Votre contenu"
				type="text"
				outlined
				required
			></v-textarea>

			<v-file-input
				v-model="image"
				label="Importer une image"
				type="file"
				accept="image/*"
				filled
				prepend-icon="mdi-camera"
			></v-file-input>

			<v-btn
                v-if="mode === 'createPost'"
				:disabled="!valid"
				color="secondary"
				type="submit"
				class="ma-2 px-5"
				@click.prevent="createPost()"
			>
            </v-btn>
            <v-btn
                v-if="mode === 'editPost'"
				:disabled="!valid"
				color="secondary"
				type="submit"
				class="ma-2 px-5"
				@click.prevent="editPost()"
			>
				Envoyer
			</v-btn>
		</v-form>
	</v-card>
</template>


<script>
import { ref } from "@vue/composition-api";

export default {
	name: "CreatePost",
    props: ["mode", "postId"],
	setup(context, { emit, root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
        const mode = context.mode;
        const postId = context.postId;

        console.log(postId);

		let valid = ref(null);
		const rule = [(v) => !!v || "Ce champs est requis"];

		let post = {
			title: "",
			content: "",
		};

		let image = ref(null);

		/* functions */

        // Create Post
		const createPost = () => {
			// store actions
			store
				.dispatch("postData", {
					endpoint: "/posts",
					data: post,
					hasAuth: true,
					file: image.value,
				})
				.then(() => switchMode("dashboard"))
				.catch((err) => console.log({ err }));
		};

        // Edit Post
        const editPost = () => {
            store
                .dispatch("editData", {
					endpoint: `/posts/${postId}`,
					data: post,
					file: image.value,
				})
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        };

		const switchMode = (mode) => {
			emit("switchMode", mode);
		};

		/* return data */
		return {
			post,
			valid,
			rule,
			createPost,
			image,
            editPost,
            mode,
            postId
		};
	},
};
</script>
