import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
//import { IS_USER_AUTHENTICATE_GETTER } from '../store/index'

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { requireAuth: false },
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
		meta: { requireAuth: true },
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
    // user is not loggIn
	if (
		to.meta.requireAuth &&
		( !store.getters.isLoggedIn ||
        !store.getters.isActiveUser )
	) {
		next("/");
	} 
    // user is Logged
    else if (
		!to.meta.requireAuth &&
		( store.getters.isLoggedIn &&
        store.getters.isActiveUser )
	) {
		next("/dashboard");
	} 

    else {
		next();
	}
});

export default router;
