<template>
	<div>
        <v-btn
			@click="overlay = !overlay"
			color="secondary"
			x-small
			outlined
		>
			supprimer
		</v-btn>

		<v-overlay 
            :absolute="absolute"
            :value="overlay"
            :opacity="opacity"
            type="warning"
            text
            color="primary"
        >
                Êtes-vous sûr de vouloir supprimer votre publication ?
                <div class="text-center">
                    <v-btn
                        @click="deletePost()"
                        color="error"
                        plain
                        class="mr-3 black--text font-weight-bold"
                    >
                        supprimer
                    </v-btn>
                    <v-btn
                        @click="overlay = false"
                        color="grey lighten-5"
                        plain
                        class="font-weight-bold"
                    >
                        annuler
                    </v-btn>
                </div>
		</v-overlay>
	</div>
</template>

<script>
export default {
	name: "Delete",
	props: ["postId"],
	setup(props, { root, emit }) {
        /* variables */
		const store = root.$store; // access to store

        let absolute= true
        let overlay= false
        let opacity = 0.9

		// delete Post
		const deletePost = () => {
			store
				.dispatch("deleteData", `/posts/${props.postId}`)
				.then((message) => {
					console.log(message);
					emit("switchMode", "dashboard");
				})
				.catch((err) => console.log(err));
		};

		/* return data */
		return {
			deletePost,
            absolute,
            overlay,
            opacity
		};
	},
};
</script>
