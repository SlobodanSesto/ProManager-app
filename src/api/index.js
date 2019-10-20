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
	hasImage: (params) => {
		return baseURL({
			url: 'auth/users/hasimage',
			method: 'GET',
			params: params
		});
	},
	saveUserInfo: (formData) => {
		return baseURL({
			url: 'auth/users',
			method: 'PUT',
			data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
		});
	},
	saveNewImage: (formData) => {
		return baseURL({
			url: 'auth/users/img',
			method: 'PUT',
			data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
		});
	},
	getAllTags: (id) => {
		return baseURL({
			url: `projects/${id}/alltags`,
			method: 'GET'
		});
	},
	getProjectUsers: (id) => {
		return baseURL({
			url: `projects/${id}/users`,
			method: 'GET'
		});
	},
}