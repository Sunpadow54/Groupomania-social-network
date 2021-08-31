<template>
  <!--   <v-app>
 -->
  <v-row no-gutters>
    <v-col class="hidden-sm-and-down" md="5">
      <v-img
        src="https://picsum.photos/350/165?random"
        height="100vh"
        cover
      ></v-img>
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
            <v-tab @click="switchMode(true)">Connection</v-tab>
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
            <h1 class="text-h4">Bienvenue sur votre réseau social</h1>
            <h2 class="text-h6 py-1" v-if="mode.login">connectez-vous</h2>
            <h2 class="text-h6 py-1" v-if="!mode.login" :disabled="mode.login">
              inscrivez-vous
            </h2>
          </v-container>
          <v-container pa-0>
            <FormSignup v-if="!mode.login" v-on:switchToLog="switchMode" />
            <FormLogin v-if="mode.login" />
          </v-container>
        </v-main>
      </v-card>

      <!-- </v-col> -->
    </v-col>
  </v-row>
  <!-- </v-container> -->
  <!--  </v-app> -->

  <!--     <div id="auth" class="d-flex flex-column justify-content-center align-items-center bg-dark">
				<div>

						<header id="nav">
								<ul class="nav justify-content-center text-center">
										<li class="nav-item w-50">
												<button @click="switchMode"
														:disabled="mode.login"
														class="nav-link fw-bold text-brand-primary border border-4 w-100">Connection</button>
										</li>
										<li class="nav-item w-50">
												<button @click="switchMode"
														:disabled="!mode.login"
														class="nav-link fw-bold text-brand-primary border border-4 w-100">Inscription</button>
										</li>
								</ul>
								<div class="container py-5 text-center">
										<img alt="Groupomania_logo" src="../assets/groupomania-logo_black.svg" class="img-fluid" />
										<h1 class="h2 py-4"> Bienvenue sur votre réseau social </h1>

										<h2 class="h3" v-if="mode.login">connectez-vous</h2>
										<h2 class="h3" v-if="!mode.login">inscrivez-vous</h2>
										<h3>{{ $store.state.user }}</h3>
								</div>
						</header>
					
						<main class="home container-mb mb-5">
								<FormSignup v-if="!mode.login" v-on:switchToLog="switchMode"/>
								<FormLogin v-if="mode.login" />
						</main>
				</div>
		</div> -->
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
    };
  },
  methods: {
    // switch between Login / signup mode
    switchMode: function (isLogin) {
      this.mode.login = isLogin;
    },
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
