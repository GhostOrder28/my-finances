import { ActionContext, Commit } from 'vuex';
import { AuthenticationError } from '../../../server/src/errors/server-errors';
import { isAxiosError } from 'axios';
import store from './index';
import { UserData } from '@/types/store/state.types';
import { UserCredentials, SignupData } from '#backend/auth.types'
import http from '@/utils/axios-instance';

async function signinUser ({ commit }: ActionContext<UserData, UserData>, userCredentials: UserCredentials) {
  try {
    const { email, password } = userCredentials;
    const res = await http.post<{ userData: UserData }>('/auth/signin', { email, password });
    commit('setUserId', res.data.userData._id);
    commit('setUsername', res.data.userData.username);
    commit('setEmail', res.data.userData.email);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response) {
        const { authenticationError, validationError } = err.response?.data;
        console.log(err.response?.data);
        if (authenticationError) commit('setErrors', { authenticationError });
        if (validationError) commit('setErrors', validationError);
        throw new AuthenticationError('there is an authentication error');
      } else {
        throw new Error(`there was an axios error: ${err}`)
        // console.error(err)
      }
    } else {
      throw new Error(`there was an error: ${err}`)
    } 
  }
}

async function signupUser ({ commit }: ActionContext<UserData, UserData>, signupData: SignupData) {
  try {
    const { username, email, password } = signupData;
    const res = await http.post<{ userCredentials: UserCredentials }>('/auth/signup', { username, email, password });
    store.dispatch('signinUser', {
      email: res.data.userCredentials.email,
      password: res.data.userCredentials.password,
    })
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err.response?.data);
      const { validationError } = err.response?.data;
      if (validationError) commit('setErrors', validationError);
    }
    return Promise.reject(err)
  }
}

async function signoutUser ({ commit }: { commit: Commit }) {
  await http.get('/auth/signout');
  commit('resetState');
}

export {
  signinUser,
  signupUser,
  signoutUser,
}
