import api from '../api/index';

export default {
	logUserOut: ({commit}, params) => {
		localStorage.removeItem('sid');
		commit('STORE_USER', null);
		console.log('user logged out');
	},
	fetchProjects:({commit}, params) => {
		console.log("action");
		return api.projects().then( res => {
			// console.log(res);
			commit('STORE_PROJECTS', res.data);
		})
	},
	setUser:({commit}, params) => {
		return commit('STORE_USER', params);
	},
	setModalActive: ({commit}, params) => {
		// console.log(params)
		return commit('MODAL_STATE', params);
	},
	setCurrentRoute: ({commit}, params) => {
		console.log(params)
		return commit('CURRENT_ROUTE', params);
	},
}