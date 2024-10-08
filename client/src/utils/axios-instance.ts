import axios from "axios";
import store from '../store/index';
import router from "@/router";

const options = {
  baseURL: process.env.VUE_APP_API_BASE_URL || '/',
  withCredentials: true,
}

const http = axios.create(options);

// http.defaults.responseType = 'json';
// http.interceptors.request.use(
//   function (request) {
//     console.log('successful request', request);
//     return request;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// )

http.interceptors.response.use(
  function (response) {
    console.log('successful request!');
    return response; 
  },
  function (error) {
    if (error.response?.status === 401 && !error.response.data.authenticationError) {
      console.log('authorization error');
      store.commit('resetState')
      store.commit('setErrors', { authorizationError: 'Hubo un error al comprobar tu identidad, porfavor vuelve a ingresar.' })
      router.push('/signin')
    }
    return Promise.reject(error);
  }
)

export default http;
