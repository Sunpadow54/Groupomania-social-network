<template>
	<div>
		<v-btn
			@click="overlay = !overlay"
			color="blue-grey"
			small
            rounded
            outlined  
		>
			<v-icon left>mdi-delete-forever-outline</v-icon>
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
			Êtes-vous sûr de vouloir supprimer votre {{ deleteType }} ?

			<div class="text-center">
				<v-btn
					@click="deleteIt()"
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
import { ref, onMounted } from "@vue/composition-api";

export default {
	name: "Delete",
	props: ["postId", "mode"],
	setup(props, { root, emit }) {
		/* variables */
		const store = root.$store; // access to store
        const router = root.$router;
        
		let absolute = true;
		let overlay = false;
		let opacity = 0.9;

        let deleteType = ref('');

        /* functions */
		const deleteIt = () => {
            // delete post ?
            if (props.mode === 'onePost') {
                store
                    .dispatch("deleteData", `/posts/${props.postId}`)
                    .then((message) => {
                        console.log(message);
                        emit("switchMode", "dashboard");
                    })
                    .catch((err) => console.log(err));
            }
            
            // delete user ?
            if (props.mode === 'profile') {
                store
                    .dispatch("deleteData", `/profile/${store.state.userId}`)
                    .then(() => {
                        store.commit('resetState'); //delete store
                        router.push({ name: "Home" }); // redirect home
                    })
                    .catch((err) => console.log(err));
            }
		};

        // Render
		onMounted(() => {
			if (props.mode === 'onePost') {
                deleteType.value = 'publication'
            }
            if (props.mode === 'profile') {
                deleteType.value = 'compte'
            }
		});

		/* return data */
		return {
			deleteIt,
			absolute,
			overlay,
			opacity,
            deleteType
		};
	},
};
</script>
