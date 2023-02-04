import axios from "axios";
import store from '../store/index';
import router from "@/router";

const options = {
  // baseURL: 'https://localhost:3001',
  baseURL: '/',
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json'
  // }
}

const http = axios.create(options);

// http.defaults.responseType = 'json';

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
