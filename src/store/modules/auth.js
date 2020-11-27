import { AUTH } from "@/config/firebase";
import clone from "lodash/cloneDeep";

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    GET_USER: (state) => state.user,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = clone(payload);
    },
    DELETE_USER: (state) => (state.user = null),
  },
  actions: {
    async signUp({ commit }, { email, password }) {
      try {
        const user = await AUTH.createUserWithEmailAndPassword(email, password);
        commit("SET_USER", user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const user = await AUTH.signInWithEmailAndPassword(email, password);
        commit("SET_USER", user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    },
    async logout({ commit }) {
      try {
        await AUTH.signOut();
        commit("DELETE_USER");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
