<template>
	<v-row no-gutters>
		<v-col class="hidden-sm-and-down" md="5">
			<v-img
				:src="selectedImage"
                alt="home-decorative-image-Groupomania"
                gradient="340deg, rgba(9,31,67,0.8) 0%, rgba(9,31,67,0.7) 57%, rgba(209,81,90,0.3) 100%"
				height="100vh"
                width="100%"
				cover
			/>
		</v-col>

		<v-col
			cols="12"
			md="7"
			max-height="100vh"
			class="d-flex align-md-center justify-center"
		>
			<v-card elevation="3" max-width="450">
				<v-app-bar dense flat dark color="primary">
					<v-tabs grow>
						<v-tabs-slider color="secondary"></v-tabs-slider>
						<v-tab @click="switchMode(true)">Connexion</v-tab>
						<v-tab @click="switchMode(false)">Inscription</v-tab>
					</v-tabs>
				</v-app-bar>

				<v-main class="pa-5">
					<v-container class="text-center">
						<img
							class="py-3"
							alt="Groupomania_logo"
							src="../assets/groupomania-logo_black.svg"
							width="70%"
						/>
						<h1 class="text-h4">
							Bienvenue sur votre réseau social
						</h1>
						<h2 class="text-h6 py-1" v-if="mode.login">
							connectez-vous
						</h2>
						<h2
							class="text-h6 py-1"
							v-if="!mode.login"
							:disabled="mode.login"
						>
							inscrivez-vous
						</h2>
					</v-container>
					<v-container pa-0>
						<FormSignup
							v-if="!mode.login"
							v-on:switchToLog="switchMode"
						/>
						<FormLogin v-if="mode.login" />
					</v-container>
				</v-main>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import FormSignup from "@/components/FormSignup.vue";
import FormLogin from "@/components/FormLogin.vue";

export default {
	name: "Home",
	components: { FormSignup, FormLogin },
	data() {
		return {
			mode: {
				login: true,
			},
            images: [
                '85gb_photo-R8e7uenx1NM-unsplash.jpg',
                'cherrydeck-rMILC1PIwM0-unsplash.jpg',
                'daria-shevtsova-k_RYBedEvDw-unsplash.jpg',
                'john-towner-p-rN-n6Miag-unsplash.jpg',
                'kevin-matos-Nl_FMFpXo2g-unsplash.jpg',
                'krakenimages-Y5bvRlcCx8k-unsplash.jpg'
            ],
		};
	},
	methods: {
		// switch between Login / signup mode
		switchMode: function(isLogin) {
			this.mode.login = isLogin;
		},
        randomImages: function(items) {
            return items[Math.floor(Math.random()*items.length)];
        }
	},
    computed: {
        selectedImage () {
            return require(`../assets/gallerie/${this.randomImages(this.images)}`)
            
        }
    },

};
</script>

<style scoped>
#auth {
	min-height: 100%;
}
#nav .nav-link:disabled {
	background-color: var(--brand-color-primary);
	color: #ffff;
	border-color: var(--brand-color-primary) !important;
}
</style>
