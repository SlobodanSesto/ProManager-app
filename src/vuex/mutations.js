export default {
  STORE_PROJECTS(state, payload){
    state.projects = payload;
  },
  STORE_USER(state, payload){
    state.user = payload;
  },
  MODAL_STATE(state, payload) {
    state.modalActive = payload;
  },
  CURRENT_ROUTE(state, payload) {
    state.currentRoute = payload;
  },

}