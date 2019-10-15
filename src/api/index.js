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
	getTaskFeed: (id, params) => {
		return baseURL({
			url: `/tasks/${id}/feeds`,
			method: 'GET',
			params: params
		});
	},
	sendMessage: (id, formData) => {
		return baseURL({
			url: `/tasks/${id}/feeds`,
			method: 'POST',
			data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
		});
	},
	getFeed: (params) => {
		return baseURL({
			url: 'users/feeds',
			method: 'GET',
			params: params
		});
	},
}