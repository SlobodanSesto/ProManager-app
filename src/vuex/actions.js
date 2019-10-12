import api from '../api/index';

export default {
  fetchProjects:({commit}, params) => {
		console.log("action");
		return api.projects().then( res => {
			console.log(res);
			commit('STORE_PROJECTS', res.data.data);
		})
	},
	setUser:({commit}, params) => {
		return commit('STORE_USER', params);
	},
	setModalActive: ({commit}, params) => {
		console.log(params)
		return commit('MODAL_STATE', params);
	},
}