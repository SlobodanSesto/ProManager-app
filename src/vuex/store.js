import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const state = {
    user: null,
    projects: [],
    modalActive: false,
    currentRoute: null,
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
