/* eslint-disable no-empty-pattern */
/* eslint-disable no-useless-catch */
import clone from "lodash/cloneDeep";
import { DB, AUTH, STORAGE } from "@/config/firebase";

const postModel = {
	author: {
		name: "",
    phoneNumber: "",
    email: ""
	},
	title: "",
	description: "",
	created_at: "",
	eventDate: "",
	authorID: "",
	location: "",
	supportLink: "",
  type: "",
  isBookmarked: false
};

export default {
  namespaced: true,
  state: {
    selected_post: postModel,
    post_list: [],
    subscriber: null,
    post_filters: [],
    post_search: ""
  },
  getters: {
    GET_SELECTED_POST: state => state.selected_post,
    GET_ALL_POST: state => state.post_list,
    //Getter for the posts of the provider
    GET_PROVIDERS_POSTS(state) {
      const currentUserID = AUTH.currentUser.uid;
      return state.post_list.filter(post => post.authorID === currentUserID);
    },
    //Getter for the bookmarked post of the individual user
    GET_BOOKMARKED_POSTS(state, getters, rootState, rootGetters) {
      const currentUser = rootGetters["auth/GET_USER"];
      return state.post_list.filter(post => currentUser.bookmarks.includes(post.id));
    },
    GET_FILTER_POST: state =>
      state.post_list.filter(post => state.post_filters.includes(post.type)),
    GET_SEARCH_POST: state =>
      state.post_list.filter(
        post =>
          post.title.includes(state.post_search) ||
          post.author.name.includes(state.post_search) ||
          post.description.includes(state.post_search)
      ),
    GET_SEARCH_AND_FILTER_POST: state =>
      state.post_list
        .filter(
          post =>
            !state.post_search.length ||
            post.title
              .toLowerCase()
              .includes(state.post_search.toLowerCase()) ||
            post.author.name
              .toLowerCase()
              .includes(state.post_search.toLowerCase()) ||
            post.description
              .toLowerCase()
              .includes(state.post_search.toLowerCase())
        )
        .filter(
          post =>
            !state.post_filters.length || state.post_filters.includes(post.type)
        )
  },
  mutations: {
    SET_SELECTED_POST(state, post) {
      state.selected_post = clone(post);
    },
    CLEAR_SELECTED_POST(state) {
      state.selected_post = {};
    },
    CLEAR_POST_LIST(state) {
      state.post_list = [];
    },
    SET_POST_LIST(state, post_list) {
      state.post_list = clone(post_list);
    },
    ADD_TO_POST_LIST(state, post) {
      state.post_list.unshift(post);
    },
    UPDATE_TO_POST_LIST(state, post) {
      const index = state.post_list.findIndex(p => p.id === post.id);
      if (index !== -1) {
        Object.keys(post).forEach(key => {
          state.post_list[index][key] = post[key]; //update per property of the object
        });
        state.post_list = [...state.post_list];
      }
    },
    REMOVE_TO_POST_LIST(state, post) {
      const index = state.post_list.findIndex(p => p.id === post.id);
      if (index !== -1) state.post_list.splice(index, 1);
    },
    CLEAR_SUBSCRIBER(state) {
      if (state.subscriber) {
        state.subscriber();
      }
    },
    SET_SUBSCRIBER(state, payload) {
      state.subscriber = payload;
    },
    SET_FILTER_POST(state, filters) {
      state.post_filters = filters;
    },
    SET_SEARCH_POST(state, search) {
      state.post_search = search;
    }
  },
  actions: {
    async LISTEN_TO_POSTS({ state, commit, rootGetters, dispatch }) {
      commit("CLEAR_POST_LIST");
      const cachedAuthors = [];
      const currentUser = rootGetters["auth/GET_USER"];

      try {
        const subscriber = DB.collection("posts")
          .orderBy("created_at")
          .onSnapshot(async snapshot => {
            const changes = snapshot.docChanges();

            for (const change of changes) {
              const post = change.doc.data();
              post.id = change.doc.id;

              //Get Author from the cached authors list
              const existingAuthor = cachedAuthors.find(author => author.id === post.authorID);
              if(!existingAuthor) {
                const author = await dispatch("users/GET_USER", post.authorID , { root: true });
                cachedAuthors.push(author);
                post.author = clone(author);
              
              } else {
                post.author = clone(existingAuthor);
              }

              //Determine if the post has been bookmarked by the currently logged in user.
              if(AUTH.currentUser) {
                post.isBookmarked = currentUser.bookmarks.includes(post.id);
              }

              if(state.selecte_post === post.id) {
                commit("SET_SELECTED_POST", post);
              }

              if (change.type === "added") {
                commit("ADD_TO_POST_LIST", post);
              } else if (change.type === "modified") {
                commit("UPDATE_TO_POST_LIST", post);
              } else if (change.type === "removed") {
                commit("REMOVE_TO_POST_LIST", post);
              }
            }
          });
        commit("SET_SUBSCRIBER", subscriber);
      } catch (error) {
        throw error;
      }
    },
    async GET_POST({}, id) {
      try {
        const post = await DB.collection("posts").doc(id).get();
        return {
          ...post.data(),
          id: post.id
        };
      } catch (error) {
        throw error;
      }
    },
    async ADD_POST({ dispatch }, { content, file }) {
      try {
        content.created_at = Date.now();
        content.authorID = AUTH.currentUser.uid;

        const addPost = await DB.collection("posts").add(content);
        const postID = addPost.id;
        
        if (file) {
          await dispatch("UPLOAD_BANNER_PHOTO", {
            postID,
            file
          });
        }
      } catch (error) {
        throw error;
      }
    },
    async EDIT_POST({ dispatch }, { content, file }) {
      try {
        await DB.collection("posts").doc(content.id).update(content);

        if (file) {
					await dispatch("UPLOAD_BANNER_PHOTO", {
						postID: content.id,
						file,
					});
				}
      } catch (error) {
        throw error;
      }
    },
    async DELETE_POST({ dispatch }, post) {
      try {
        await DB.collection("posts").doc(post.id).delete();

        if(post.bannerURL) {
          post.dontUpdate = true;
          await dispatch("REMOVE_BANNER_PHOTO", post);
        }
      } catch (error) {
        throw error;
      }
    },
    async UPLOAD_BANNER_PHOTO({}, { postID, file }) {
      try {
        const fileType = file.type.split("/")[1];
				const postPicRef = STORAGE.ref(`/post_pictures/${postID}.${fileType}`);
				await postPicRef.put(file);
				const downloadURL = await postPicRef.getDownloadURL();

				await DB.collection("posts").doc(postID).update({ 
          bannerURL: downloadURL,
          bannerURLType: fileType
        });

        return true;

      } catch(error) {
        throw error;
      }
    },
    async REMOVE_BANNER_PHOTO({}, post) {
      try {
        const postPicRef = STORAGE.ref(`/post_pictures/${post.id}.${post.bannerURLType}`);
				await postPicRef.delete();
        
        if(post.hasOwnProperty("dontUpdate") && post.dontUpdate) {
          //for post document that has been deleted, dont update the document any more
          return;
        }

        await DB.collection("posts").doc(post.id).update({
          bannerURL: null,
          bannerURLType: null,
        });
				
        return true;
      } catch(error) {
        throw error;
      }
    }
  }
};
