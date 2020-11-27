/* eslint-disable no-empty-pattern */
/* eslint-disable no-useless-catch */
import clone from 'lodash/cloneDeep';
import { DB } from '@/config/firebase';

export default {
  state: {
    selected_post: {},
    post_list: []
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
    SET_POST_LIST(state, post_list) {
      state.post_list = clone(post_list);
    },
    UPDATE_TO_POST_LIST(state, post) {
      const index = state.post_list.findIndex(p => p.id === post.id);
      if(index !== -1) state.post_list[index] = clone(post);
    },
    REMOVE_TO_POST_LIST(state, post) {
      const index = state.post_list.findIndex(p => p.id === post.id);
      if(index !== -1) state.post_list.splice(index, 1);
    }
  },
  actions: {
    async GET_ALL_POST({ commit }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const post_collection = await DB.collection('posts').get();
        const posts = post_collection.docs.map(doc => {
          const post = doc.data();
          post.id = doc.id;
          return post;
        });

        commit('SET_POST_LIST', posts);
        return posts;
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
    }
  }
}