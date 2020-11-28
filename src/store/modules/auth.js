import { FB, DB, AUTH } from "@/config/firebase";
import clone from "lodash/cloneDeep";

const userModel = {
	name: "",
	email: "",
	type: "individual",
	displayPhoto: "",
	bookmarks: [],
	phoneNumber: "",
};

export default {
	namespaced: true,
	state: {
		user: userModel,
	},
	getters: {
		GET_USER: (state) => state.user,
	},
	mutations: {
		SET_USER(state, payload) {
			state.user = clone(payload);
		},
		CLEAR_USER(state) {
      state.user = clone(userModel)
    },
    UPDATE_USER(state, newDetails) {
      Object.keys(newDetails).forEach(key => {
        state.user[key] = newDetails[key];
      });
    }
	},
	actions: {
		async SIGN_UP({ commit }, user) {
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
					phoneNumber: "",
				};
				await DB.collection("users")
					.doc(createdUser.user.uid)
					.set(reference);
				reference.id = createdUser.user.uid;
				commit("SET_USER", reference);
				return true;
			} catch (error) {
				throw error;
			}
		},
		async LOGIN({ commit }, { email, password }) {
			try {
				const user = await AUTH.signInWithEmailAndPassword(email, password);
				const userRef = await DB.collection("users")
					.doc(user.user.uid)
					.get();
				const userData = {
					...userRef.data(),
					id: userRef.id,
				};
				commit("SET_USER", userData);
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
					id: user.id,
				};
				commit("SET_USER", data);
				return true;
			} catch (error) {
				AUTH.signOut();
				throw error;
			}
    },
    async UPDATE_USER({ commit }, {id, newDetails}) {
      try {
        await DB.collection("users").doc(id).update(newDetails);
        commit('UPDATE_USER', newDetails);
        return true;
      } catch(error) {
        throw error;
      }
    },
		async USE_GOOGLE_AUTH({ commit }) {
			try {
				const provider = new FB.auth.GoogleAuthProvider();
				const result = await AUTH.signInWithPopup(provider);
				const uid = result.user.uid;
				let user = {
					name: result.user.displayName,
					email: result.user.email,
					displayPhoto: result.user.photoURL,
					type: null,
					bookmarks: [],
				};

				const existingUser = await DB.collection("users")
					.doc(uid)
					.get();
				if (!existingUser.exists) {
					await DB.collection("users")
						.doc(uid)
						.set(user);
					user.id = uid;
					commit("SET_USER", user);
				} else {
					const data = {
						...existingUser.data(),
						id: existingUser.id,
					};
					commit("SET_USER", data);
				}
				return true;
			} catch (error) {
				throw error;
			}
		},
	},
};
