<template>
	<v-app-bar id="brand-header" dark color="grey">
		<v-toolbar-title class="align-self-center">
            <!-- Accueil -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <!-- logo btn -->
                    <v-btn
                        @click="switchMode('dashboard')"
                        aria-label="retour à l'accueil"
                        class="d-none d-sm-block"
                        v-bind="attrs"
                        v-on="on"
                        text
                    >
                        <img
                            src="../assets/groupomania-logo_colors.svg"
                            alt="retour à l'accueil"
                            width="164"
                            height="auto"
                        />
                    </v-btn>
                    <!-- logo mobile -->
                    <v-btn
                        @click="switchMode('dashboard')"
                        aria-label="retour à l'accueil"
                        class="d-sm-none"
                        v-bind="attrs"
                        v-on="on"
                        icon
                    >
                        <img
                            src="../assets/groupomania-logo_mobile.svg"
                            alt="retour à l'accueil"
                            class="d-sm-none"
                            height="36"
                        >
                    </v-btn>
                </template>
                <span>Retour aux publications</span>
            </v-tooltip>
		</v-toolbar-title>

		<v-spacer></v-spacer>

        <!-- Admin btn -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-if="$store.state.isAdmin"
                    @click="switchMode('admin')"
                    v-bind="attrs"
                    v-on="on"
                    aria-label="Moderation"
                    class="mx-1 align-self-center"
                    text
                    depressed
                    color="secondary"
                >
                    Admin
                </v-btn>
            </template>
            <span>Modération</span>
        </v-tooltip>

        <!-- New post btn -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="switchMode('createPost')"
                    class="mx-1 align-self-center"
                    aria-label="Créer un Post"
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

        <!-- Profile btn -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    @click="switchMode('profile')"
                    aria-label="Profil"
                    v-bind="attrs"
                    v-on="on"
                    text
                    depressed
                    class="mx-1 text-capitalize px-0"
                >
                    <v-icon class="mr-sm-2">mdi-account-circle</v-icon>
                    <span class="d-none d-sm-inline">{{ $store.getters.getUsername }}</span>
                </v-btn>
            </template>
            <span>Profil</span>
        </v-tooltip>

        <!-- Logout btn -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    @click="disconnect()"
                    v-bind="attrs"
                    aria-label="se déconnecter"
                    v-on="on"
                    icon
                    tile
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
import { ref } from "@vue/composition-api";
export default {
	name: "HeaderNav",

	setup(props, { emit, root }) {
		/* variables */
		const store = root.$store; // access to store in setup()
        const router = root.$router;
		let userName = ref(store.state.username);

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
            disconnect
		};
	},

};
</script>

<style scoped>
    #brand-header {
        /* outline: 4px solid linear-gradient(#a36e72,#091f43); */
        outline: 4px solid #d1515a;
    }
</style>