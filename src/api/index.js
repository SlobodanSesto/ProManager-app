import { baseURL } from './config.js'

export default {
	loginApi: (params) => {
		return baseURL({
			url: 'auth/login',
			method: 'POST',
			params: params
		});
	},
	projects: (params) => {
		return baseURL({
			url: 'projects',
			method: 'GET',
			params: params
		});
	},
	getOneProject: (params) => {
		return baseURL({
			url: `projects/${params.proId}`,
			method: 'GET',
			params: params
		});
	},
	getTasks: (params) => {
		return baseURL({
			url: 'users/tasks',
			method: 'GET',
			params: params
		});
	},
	getOneTask: (params) => {
		return baseURL({
			url: `/tasks/${params.taskId}`,
			method: 'GET',
			params: params
		});
	},
}