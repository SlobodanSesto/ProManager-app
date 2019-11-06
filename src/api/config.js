import axios from 'axios'

export const baseURL = axios.create({
  baseURL : "http://localhost:3000/api/"
});

baseURL.interceptors.request.use(config => {
  try {
    let token = localStorage.getItem("token");
    if (token == 'undefined' || token == undefined || token === null) {
      console.log('No token');
      return config;
    } else if (!config.headers) {
      config.headers = {
        Authorization : "bearer " + token
      }
    } else {
      config.headers.Authorization = "bearer " + token;
    }
  } catch (e) {
    console.log('ERR', e);
  }
  return config;
});