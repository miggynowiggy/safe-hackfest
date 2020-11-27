import Vue from "vue";
import Vuex from "vuex";

//import <moduleName> from './modules/<filenameOfModule>';
import sample from './modules/sample';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
    sample
  },
	strict: process.env.NODE_ENV !== "production",
});
