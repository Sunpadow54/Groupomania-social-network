import Vue from 'vue'
import Vuex from 'vuex'
const url = 'http://localhost:3000/api';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: 'truc',
		/*         dataApi: [], */
		/*         user: {
					username: 'test test',
					isActive: 0,
					isAdmin:0
				}, */
		/*         token: 'truc', */
	},
	mutations: {
		/*       SET_DATA(state, value) {
				  state.dataApi = value;
			  } */
	},
	actions: {
		getData(context, endpoint) {
			return new Promise((resolve, reject) => {
				fetch(url + endpoint)
					.then(res => {
						if (!res.ok) {
							reject(`Désolé, il est impossible d'accéder à l'API. ( erreur status: ${res.status})`);
						}
						resolve(res.json())
					})
			})
		},
		postData(context, { endpoint, data }) {
			return new Promise((resolve) => {
				fetch(url + endpoint, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				})
					.then(res => {
							resolve(res.json())
					})
			})
		}
	},
	modules: {
	}
})
