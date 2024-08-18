import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      // Optionally, save the token to localStorage
      localStorage.setItem("token", token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    clearToken({ commit }) {
      commit("CLEAR_TOKEN");
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});
