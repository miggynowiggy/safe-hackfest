import { FB, DB, AUTH } from "@/config/firebase";
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
    DELETE_USER: state => state.user = null,
  },
  actions: {
    async SIGN_UP({ commit }, user) {
      try {
        const { email, password } = user;
        let name;
        let type;

        if(user.hasOwnProperty('company')) {
          name = user.company;
          type = "provider";
        
        } else {
          name = `${user.firstName} ${user.lastName}`;
          type = "individual";
        }
        
        const createdUser = await AUTH.createUserWithEmailAndPassword(email, password);
        await DB.collection("users").doc(createdUser.uid).set({ name, email, type, savedPosts: [] });
        commit("SET_USER", { name, email, type, savedPosts: [] });
        return true;

      } catch (error) {
        throw error;
      }
    },
    async LOGIN({ commit }, { email, password }) {
      try {
        const user = await AUTH.signInWithEmailAndPassword(email, password);
        const userRef = await DB.collection("users").doc(user.uid).get();
        const userData = userRef.data();
        userData.id = userRef.id;
        commit("SET_USER", userData);
        return true;

      } catch (error) {
        throw error;
      }
    },
    async LOGOUT({ commit, dispatch }) {
      try {
        await AUTH.signOut();
        commit("DELETE_USER");
        dispatch("STOP_OBSERVERS");
        return true;

      } catch (error) {
        throw error;
      }
    },
    STOP_OBSERVERS({ commit }) {
      commit("posts/CLEAR_SUBSCRIBER", null, { root: true });
    },
    async RELOAD_USER({ commit }, uid) {
      try {
        const user = await DB.collection("users").doc(uid).get();
        const data = user.data();
        data.id = user.id;
        commit("SET_USER", data);
        return true;
        
      } catch(error) {
        AUTH.signOut();
        throw error;
      }
    },
    async USE_GOOGLE_AUTH({ commit }) {
      try {
        const provider = new FB.auth.GoogleAuthProvider();
        const result = await AUTH.signInWithRedirect(provider);
        const uid = result.user.uid
        let user = {
          name: result.user.displayName,
          email: result.user.email,
          displayPhoto: result.user.photoURL,
          type: null,
        };

        const existingUser = await DB.collection('users').doc(uid).get();
        if(!existingUser.exists) {
          await DB.collection('users').doc(uid).set(user);
          user.id = uid;
          commit('SET_USER', user);

        } else {
          const data = existingUser.data();
          data.id = existingUser.id;
          commit('SET_USER', data);
        }
        return true;
      } catch(error) {
        throw error;
      }
    }
  },
};
