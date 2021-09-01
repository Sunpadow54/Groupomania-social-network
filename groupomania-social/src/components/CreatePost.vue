<template>
    <v-card>
        <v-card-title> Créer un nouveau Post </v-card-title>

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

            <!-- <label for="avatar">Upload</label>
            <input @change="handleImage" type="file" name="upload"> -->
            <v-file-input
                v-model="image"
                
                label="Importer une image"
                type="file"
                accept="image/*"
                filled
                prepend-icon="mdi-camera"
            ></v-file-input>

            <v-btn
                :disabled="!valid"
                color="secondary"
                type="submit"
                class="ma-2 px-5"
                @click.prevent="createPost()"
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
	setup(context, { root }) {
        /* variables */
		const store = root.$store; // access to store in setup()

        let valid = ref(null);
        const rule =  [v => !!v || "Ce champs est requis"];

		let post = {
			title: "",
			content: "",
		};
        
        let image = ref(null);

        /* functions */
        const createPost = () => {
            const newData = new FormData();
                newData.append('post', JSON.stringify(post));
                newData.append('image', image.value);
            // store actions
            store.dispatch("postDataWithFile", {
					endpoint: "/posts",
					data: newData,
				})
                .then((res) => console.log(res))
                .catch((err) => console.log({err}));
        }

    
		return {
			post,
			valid,
            rule,
            createPost,
            image,
            
		};
	},
};
</script>
