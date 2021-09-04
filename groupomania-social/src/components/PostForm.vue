<template>
	<v-card>
		<v-card-title v-if="mode === 'createPost'">
			Créer un nouveau Post
		</v-card-title>
		<v-card-title v-if="mode === 'editPost'">
			Modifier son Post
		</v-card-title>

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
				:label="labelImgInput"
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
                Envoyer
			</v-btn>
			<v-btn
				v-if="mode === 'editPost'"
				:disabled="!valid"
				color="secondary"
				type="submit"
				class="ma-2 px-5"
				@click.prevent="editPost()"
			>
				Modifier
			</v-btn>
		</v-form>

		<v-img
			v-model="oldImage"
			v-if="mode === 'editPost'"
			:src="oldImage"
			max-width="250"
		>
		</v-img>
	</v-card>
</template>

<script>
import { ref, onMounted, watch, } from "@vue/composition-api";

export default {
	name: "PostForm",
	props: ["mode", "postId"],
	setup(props, { emit, root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
		let valid = ref(null);
		const rule = [(v) => !!v || "Ce champs est requis"];

        let post = ref(null);

		let image = ref(null);
		let oldImage = ref(null);
        let labelImgInput = ref(null);

		/* functions */

		// Create Post
		const createPost = () => {
			// store actions
			store
				.dispatch("postData", {
					endpoint: "/posts",
					data: post.value,
					hasAuth: true,
					file: image.value,
				})
				.then(() => switchMode("dashboard"))
				.catch((err) => console.log({ err }));
		};

        // show the correct input if form is to create or edit
		const showInputValue = () => {
            if (props.mode === 'editPost') {
                // change label of image upload
                labelImgInput.value = 'changer son image';
                // set input value from old post
                store
                    .dispatch("getData", `/posts/${props.postId}`)
                    .then((postFetched) => {
                        post.value = {
                            title: postFetched.title,
                            content: postFetched.content,
                        };
                        oldImage.value = postFetched.img;
                    })
                    .catch((err) => console.log(err));
            }
            if (props.mode === 'createPost') {
                // change label of image upload
                labelImgInput.value = 'Importer une image';
                // empty values
                post.value = {
                    title:'',
                    content: ''
                }
            }
		};

        // Edit Post
		const editPost = () => {
            console.log(image.value);
			store
				.dispatch("editData", {
					endpoint: `/posts/${props.postId}`,
					data: post.value,
                    // if user wants to change image or not
					file: image.value ? image.value : false,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		};

		const switchMode = (mode) => {
			emit("switchMode", mode);
		};

        // render
        onMounted(() => {
            showInputValue()
        })

        // if mode change, show correct input
        watch(() => props.mode, () => {
            showInputValue()
        })

		/* return data */
		return {
			post,
			valid,
			rule,
			createPost,
			image,
			showInputValue,
			editPost,
			oldImage,
            labelImgInput
		};
	},
};
</script>
