import Vue from "vue";
import Vuex from "vuex";
const url = "http://localhost:3000/api";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: "",
		userId: "",
		username: "",
        isAdmin: false,
        isActive: false,
	},

	mutations: {
		auth_success(state, data) {
			state.token = data.token;
			state.username = data.username;
			state.userId = data.userId;
            state.isAdmin = data.isAdmin;
            state.isActive = data.isActive
		},
	},

	actions: {
		getData(context, endpoint) {
			return new Promise((resolve, reject) => {
                console.log(context.getters.getToken);
				fetch(url + endpoint, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + context.getters.getToken,
                    }
                })
                    .then((res) => {
                        if (!res.ok) {
                            reject(
                                `Désolé, il est impossible d'accéder à l'API. ( erreur status: ${res.status})`
                            );
                        }
                        resolve(res.json());
                    });
			});
		},

		postDataWithFile(context, { endpoint, data }) {
			return new Promise((resolve, reject) => {
				fetch(url + endpoint, {
					method: "POST",

					body: data,
				})
					.then((res) => {
						resolve(res.json());
					})
					.catch((err) => {
						reject(err.json());
					});
			});
		},
		postData(context, { endpoint, data, hasAuth }) {

            const authorize = hasAuth ? 
                { Authorization: "Bearer " + context.getters.getToken }
                : null

			return new Promise((resolve) => {
				fetch(url + endpoint, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
                        ...authorize
					},
					body: JSON.stringify(data),
				}).then((res) => {
					resolve(res.json());
				});
			});
		},
	},

	getters: {
		isLoggedIn: (state) => !!state.token ,
        isActiveUser: (state) => !!state.isActive,
        getToken: (state) => state.token
	},

	modules: {},
});
