export default {
	getProjects: (state) => {
		return state.projects;
	},
	getUser: (state) => {
		return state.user;
	},
	getModalActive: (state) => {
		return state.modalActive;
	},
	getCurrentRoute: (state) => {
		return state.currentRoute;
	},
}