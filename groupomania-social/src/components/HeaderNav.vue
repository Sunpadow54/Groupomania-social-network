<template>
	<v-app-bar dark color="grey">
		<v-toolbar-title class="align-self-center">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        @click="switchMode('dashboard')"
                        v-bind="attrs"
                        v-on="on"
                        text
                    >
                        <img
                            src="../assets/groupomania-logo_colors.svg"
                            alt=""
                            width="164"
                            height="auto"
                        />
                    </v-btn>
                </template>
                <span>Retour aux publications</span>
            </v-tooltip>
		</v-toolbar-title>

		<v-spacer></v-spacer>

        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="switchMode('createPost')"
                    class="mx-1 align-self-center"
                    v-bind="attrs"
                    v-on="on"
                    small
                    icon
                    tile
                    color="white"
                >
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </template>
            <span>Créer un Post</span>
        </v-tooltip>

        <v-btn
            v-if="isAdmin"
			@click="switchMode('admin')"
			class="mx-1 align-self-center"
			small
			icon
			color="secondary"
		>
			Admin
		</v-btn>

        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    @click="switchMode('profile')"
                    v-bind="attrs"
                    v-on="on"
                    text
                    depressed
                    class="mx-1"
                >
                <v-icon class="mr-2">mdi-account-circle</v-icon>
                    {{ userName }}
                </v-btn>
            </template>
            <span>Profil</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    @click="disconnect()"
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                    <v-icon>
                        mdi-logout
                    </v-icon>
                </v-btn>
            </template>
            <span>se déconnecter</span>
        </v-tooltip>
	</v-app-bar>
</template>

<script>
import { ref, watch, } from "@vue/composition-api";
export default {
	name: "HeaderNav",

	setup(props, { emit, root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
        const router = root.$router;
		let userName = ref(store.state.username);
        let isAdmin = ref(store.state.isAdmin);

        // watch change made from updating account username
        watch(() => store.state.username, () => {
            userName.value = store.getters.getUsername;
        })
        
		/* functions */
		const switchMode = (mode) => {
			emit("switchMode", mode);
		};

        const disconnect = () => {
            store.commit('resetState');
            router.push({ name: "Home" });
        }
		/* return data */
		return {
			switchMode,
			userName,
            isAdmin,
            disconnect
		};
	},

};
</script>
