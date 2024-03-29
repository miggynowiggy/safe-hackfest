import { FB, DB, AUTH, STORAGE } from "@/config/firebase";
import clone from "lodash/cloneDeep";

const userModel = {
  name: "",
  email: "",
  type: "individual",
  displayPhoto: "",
  bookmarks: [],
  phoneNumber: ""
};

export default {
  namespaced: true,
  state: {
    user: userModel
  },
  getters: {
    GET_USER: state => state.user
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = clone(payload);
    },
    CLEAR_USER(state) {
      state.user = clone(userModel);
    },
    UPDATE_USER(state, newDetails) {
      Object.keys(newDetails).forEach(key => {
        state.user[key] = newDetails[key];
      });
    }
  },
  actions: {
    async SIGN_UP({ commit, dispatch }, user) {
      try {
        const { email, password } = user;
        let name;
        let type;

        if (user.hasOwnProperty("company")) {
          name = user.company;
          type = "provider";
        } else {
          name = `${user.firstName} ${user.lastName}`;
          type = "individual";
        }

        const createdUser = await AUTH.createUserWithEmailAndPassword(
          email,
          password
        );
        const reference = {
          name: name,
          email: email,
          type: type,
          displayPhoto: "",
          bookmarks: [],
          phoneNumber: ""
        };
        await DB.collection("users")
          .doc(createdUser.user.uid)
          .set(reference);
        reference.id = createdUser.user.uid;
        commit("SET_USER", reference);
        dispatch("START_OBSERVERS");
        return true;
      } catch (error) {
        throw error;
      }
    },
    async LOGIN({ commit, dispatch }, { email, password }) {
      try {
        const user = await AUTH.signInWithEmailAndPassword(email, password);
        const userRef = await DB.collection("users")
          .doc(user.user.uid)
          .get();
        const userData = {
          ...userRef.data(),
          id: userRef.id
        };
        commit("SET_USER", userData);
        dispatch("START_OBSERVERS");
        return true;
      } catch (error) {
        throw error;
      }
    },
    async LOGOUT({ commit, dispatch }) {
      try {
        await AUTH.signOut();
        commit("CLEAR_USER");
        dispatch("STOP_OBSERVERS");
        return true;
      } catch (error) {
        throw error;
      }
    },
    START_OBSERVERS({ dispatch }) {
      dispatch("posts/LISTEN_TO_POSTS", null, { root: true });
    },
    STOP_OBSERVERS({ commit }) {
      commit("posts/CLEAR_SUBSCRIBER", null, { root: true });
    },
    async RELOAD_USER({ commit }, uid) {
      try {
        const user = await DB.collection("users")
          .doc(uid)
          .get();
        let data = {
          ...user.data(),
          id: user.id
        };
        commit("SET_USER", data);
        return true;
      } catch (error) {
        AUTH.signOut();
        throw error;
      }
    },
    async UPDATE_USER({ commit }, { id, newDetails }) {
      try {
        await DB.collection("users")
          .doc(id)
          .update(newDetails);
        commit("UPDATE_USER", newDetails);
        return true;
      } catch (error) {
        throw error;
      }
    },
    async UPDATE_DISPLAY_PHOTO({ state, commit }, { file }) {
      try {
        const user = state.user;
        const fileType = file.type.split("/")[1];
        const profilePicRef = STORAGE.ref(
          `/display_picture/${user.id}.${fileType}`
        );
        await profilePicRef.put(file);
        const downloadURL = await profilePicRef.getDownloadURL();

        await DB.collection("users")
          .doc(user.id)
          .update({
            displayPhoto: downloadURL,
            displayPhotoFormat: fileType
          });

        commit("UPDATE_USER", {
          displayPhoto: downloadURL,
          displayPhotoFormat: fileType
        });
        return true;
      } catch (error) {
        throw error;
      }
    },
    async REMOVE_DISPLAY_PHOTO({ state, commit }) {
      try {
        const user = state.user;
        const fileType = state.user.displayPhotoFormat;
        const profilePicRef = STORAGE.ref(
          `/display_picture/${user.id}.${fileType}`
        );
        await profilePicRef.delete();

        await DB.collection("users")
          .doc(user.id)
          .update({
            displayPhoto: null,
            displayPhotoFormat: null
          });

        commit("UPDATE_USER", {
          displayPhoto: null,
          displayPhotoFormat: null
        });
        return true;
      } catch (error) {
        throw error;
      }
    }
  }
};
