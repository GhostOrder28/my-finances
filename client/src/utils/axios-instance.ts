import axios from "axios";
import store from '../store/index';

const options = {
  // baseURL: 'http://localhost:8080',
  baseURL: '/',
  withCredentials: true,
}

const http = axios.create(options);

http.interceptors.response.use(
  function (response) {
    console.log('successful request!');
    return response; 
  },
  function (error) {
    console.log('there was an error trying to request that enpoint!');
    console.log(error);
    if (error.response.data.authorizationError) return store.dispatch('resetState');
    return Promise.reject(error);
  }
)

export default http;
