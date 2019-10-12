import axios from 'axios'

export const baseURL = axios.create({
  baseURL : "http://localhost:3000/api/"
});

baseURL.interceptors.request.use(config => {
  try {
    let sid = localStorage.getItem("sid");
    if (!sid) {
      console.log('No sid');
      return config;
    }
    if (!config.params) {
      config.params = {
        sid: sid
      };
    } else {
      config.params.sid = sid;
    }
  } catch (e) {
    console.log('ERR', e);
  }
  return config;
});