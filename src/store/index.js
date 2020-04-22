import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("userToken"),
    status: ""
  },
  getters: {
    isAuth: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    AUTH_LOGOUT: state => {
      state.token = "";
    },
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = "success";
      state.token = token;
    } //Changer l'api pour renvoyer une erreur
    // AUTH_ERROR: state => {
    //   state.status = "error";
    // }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve /*, reject*/) => {
        commit("AUTH_REQUEST");
        fetch("http://localhost:3030/authentication", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            strategy: "local",
            email: user.email,
            password: user.password
          })
        })
          .then(data => data.json())
          .then(data => {
            localStorage.setItem("userToken", data.accessToken);
            commit("AUTH_SUCCESS", data.accessToken);
            resolve(data);
          }); //Changer l'api pour renvoyer une erreur
        // .catch(data => {
        //   commit("AUTH_ERROR", data);
        //   localStorage.removeItem("userToken");
        //   reject(data);
        // });
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise(resolve => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem("userToken");
        resolve();
      });
    }
  },
  modules: {}
});
