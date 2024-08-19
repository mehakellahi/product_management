import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || null, // Initialize from localStorage
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token); // Save to localStorage
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem("token"); // Remove from localStorage
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
