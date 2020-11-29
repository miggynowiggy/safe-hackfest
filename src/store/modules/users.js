import { DB, FB } from '@/config/firebase';
export default {
	namespaced: true,
	state: {},
	mutations: {},
	actions: {
		async GET_USER({}, id) {
			try {
				const userRef = await DB.collection("users")
					.doc(id)
					.get();
				const user = userRef.data();
				user.id = id;
				return user;
			} catch (error) {
				console.log(error);
				throw null;
			}
    },
		async BOOKMARK_POST({ commit }, { userID, postID }) {
			try {
        const userRef = await DB.collection("users").doc(userID).get();
        const user = await userRef.data();
        user.bookmarks.push(postID);

        await DB.collection("users").doc(userID).update(user);
        
        commit(
					"posts/UPDATE_TO_POST_LIST",
					{
						id: postID,
						isBookmarked: true,
					},
					{ root: true }
				);
        commit("auth/UPDATE_USER", user, { root: true });

				return true;
			} catch (error) {
				throw error;
			}
		},
		async UNBOOKMARK_POST({ commit }, { userID, postID }) {
			try {
				const userRef = await DB.collection("users")
					.doc(userID)
					.get();
        const user = await userRef.data();
        
        const postIDIndex = user.bookmarks.findIndex(id => id === postID);
        if(postIDIndex !== -1) {
          user.bookmarks.splice(postIDIndex, 1);
        }

				await DB.collection("users")
					.doc(userID)
          .update(user);
        
        commit(
					"posts/UPDATE_TO_POST_LIST",
					{
						id: postID,
						isBookmarked: false,
					},
					{ root: true }
				);
				commit("auth/UPDATE_USER", user, { root: true });

				return true;
			} catch (error) {
				throw error;
			}
		},
	},
};