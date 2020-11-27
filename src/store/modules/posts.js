/* eslint-disable no-empty-pattern */
/* eslint-disable no-useless-catch */
import clone from 'lodash/cloneDeep';
import { DB } from '@/config/firebase';

export default {
  namespaced: true,
  state: {
    selected_post: {},
    post_list: [],
    subscriber: null
  },
  getters: {
    GET_SELECTED_POST: state => state.selected_post,
    GET_ALL_POST: state => state.post_list
  },
  mutations: {
    SET_SELECTED_POST(state, post) {
      state.selected_post = clone(post);
    },
    CLEAR_SELECTED_POST(state) {
      state.selected_post = {}
    },
    CLEAR_POST_LIST(state) {
      state.post_list = [];
    },
    SET_POST_LIST(state, post_list) {
      state.post_list = clone(post_list);
    },
    ADD_TO_POST_LIST(state, post) {
      state.post_list.push(post);
    },
    UPDATE_TO_POST_LIST(state, post) {
      const index = state.post_list.findIndex(p => p.id === post.id);
      if(index !== -1) {
        Object.keys(state.post_list[index]).forEach((key) => {
          state.post_list[index][key] = post[key]; //update per property of the object
        });
        state.post_list = [...state.post_list];
      }
    },
    REMOVE_TO_POST_LIST(state, post) {
      const index = state.post_list.findIndex(p => p.id === post.id);
      if(index !== -1) state.post_list.splice(index, 1);
    },
    CLEAR_SUBSCRIBER(state) {
      if(state.subscriber) {
        state.subscriber();
      }
    },
    SET_SUBSCRIBER(state, payload) {
      state.subscriber = payload;
    }
  },
  actions: {
    async LISTEN_TO_POSTS({ state, commit }) {
      commit('CLEAR_POST_LIST');
      try {
        const subscriber = DB.collection('posts')
          .orderBy('created_at', 'desc')
          .onSnapshot(snapshot => {
            const changes = snapshot.docChanges();

            for(const change of changes) {
              const post = change.doc.data();
              post.id = change.doc.id;

              if(change.type === 'added') {
                commit('ADD_TO_POST_LIST', post);
              
              } else if(change.type === 'modified') {
                commit('UPDATE_TO_POST_LIST', post);
              
              } else if(change.type === 'removed') {
                commit('REMOVE_TO_POST_LIST', post);
              }
            }
          });
          commit("SET_SUBSCRIBER", subscriber);

      } catch(error) {
        throw error;
      }
    },
    async GET_POST({}, id) {
      try {
        const post = await DB.collection('posts').doc(id).get();
        return {
          ...post.data(),
          id: post.id
        };
      } catch(error) {
        throw error;
      }
    },
    async ADD_POST({}, post) {
      try {
        const addPost = await DB.collection('posts').doc().set(post);
        return addPost;
      } catch(error) {
        throw error;
      }
    },
    async EDIT_POST({}, post) {
      try {
        const editPost = await DB.collection('posts').doc(post.id).update(post);
        return editPost;
      } catch(error) {
        throw error;
      }
    },
    async DELETE_POST({}, post) {
      try {
        const deletePost = await DB.collection('posts').doc(post.id).delete();
        return deletePost;
      } catch(error) {
        throw error;
      }
    }
  }
}