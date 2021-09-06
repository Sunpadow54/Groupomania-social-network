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
        changeUsername(state, newName) {
            state.username = newName
        },
        auth_success(state, data) {
            state.token = data.token;
            state.username = data.username;
            state.userId = data.userId;
            state.isAdmin = data.isAdmin;
            state.isActive = data.isActive;
        },
    },

    actions: {
        getData(context, endpoint) {
            return new Promise((resolve, reject) => {
                fetch(url + endpoint, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + context.getters.getToken,
                    },
                }).then((res) => {
                    if (!res.ok) {
                        reject(
                            `Désolé, il est impossible d'accéder à l'API. ( erreur status: ${res.status})`
                        );
                    }
                    resolve(res.json());
                });
            });
        },

        postData(context, { endpoint, data, hasAuth, file }) {
            const authorize = hasAuth
                ? { Authorization: "Bearer " + context.getters.getToken }
                : null;

            let formattedData, headers;
            if (typeof file !== "undefined") {
                formattedData = new FormData();
                formattedData.append("post", JSON.stringify(data));
                formattedData.append("image", file);
                headers = { ...authorize };
            }
            if (!file) {
                formattedData = JSON.stringify(data);
                headers = {
                    Accept: "application/json",
                    ...authorize,
                    "Content-Type": "application/json",
                };
            }

            return new Promise((resolve) => {
                fetch(url + endpoint, {
                    method: "POST",
                    headers: {
                        ...headers,
                    },
                    body: formattedData,
                }).then((res) => {
                    resolve(res.json());
                });
            });
        },
        
        editData(context, { endpoint, data, file }) {
            let fetchContent;
            // let formattedData, headers;
            if (!data) {
                fetchContent = {
                    headers: { Authorization: "Bearer " + context.getters.getToken },
                }
            }

            if (typeof file !== "undefined") {
                let formattedData = new FormData();
                formattedData.append("post", JSON.stringify(data));
                formattedData.append("image", file);
                fetchContent = {
                    headers: { Authorization: "Bearer " + context.getters.getToken },
                    body: formattedData
                }
                
            }
            if (!file && data !== false) {
                let formattedData = JSON.stringify(data);
                fetchContent = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + context.getters.getToken,
                    },
                    body: formattedData
                }
            }

            return new Promise((resolve) => {
                fetch(url + endpoint, {
                    method: "PUT",
                    ...fetchContent
                    /* headers: {
                        ...headers,
                    },
                    body: formattedData, */
                }).then((res) => {
                    resolve(res.json());
                });
            });
        },

        deleteData(context, endpoint) {
            return new Promise((resolve, reject) => {
                fetch(url + endpoint, {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + context.getters.getToken,
                    },
                }).then((res) => {
                    if (!res.ok) {
                        reject(
                            `Désolé, il est impossible d'accéder à l'API. ( erreur status: ${res.status})`
                        );
                    }
                    resolve(res.json());
                });
            });
        },
    },

    getters: {
        isLoggedIn: (state) => !!state.token,
        isActiveUser: (state) => !!state.isActive,
        getToken: (state) => state.token,
        getUsername: state => state.username
    },

    modules: {},
});
