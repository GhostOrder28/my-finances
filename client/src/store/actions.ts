import { ActionContext, Commit } from 'vuex';
import { AuthenticationError } from '@/errors/auth.errors';
import { isAxiosError } from 'axios';
import store from './index';
import { UserData } from '@/types/store/state.types';
import { UserCredentials, SignupData } from '@/types/entities/auth.types'
import http from '@/utils/axios-instance';

async function signinUser ({ commit }: ActionContext<UserData, UserData>, userCredentials: UserCredentials) {
  console.log('signin user...');
  try {
    const { email, password } = userCredentials;
    const res = await http.post<{ userData: UserData }>('/auth/signin', { email, password });
    console.log('user data from signin', res.data.userData);
    commit('setUserId', res.data.userData._id);
    commit('setUsername', res.data.userData.username);
    commit('setEmail', res.data.userData.email);
    console.log('signed user, store state: ', store.state);
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
    // why this dispatch never caused a race condition before without awaiting for it?
    await store.dispatch('signinUser', {
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

async function requestGuest () {
  try {
    const res = await http.get('/guests')
    console.log('new user credentials', res.data.userCredentials);
    await store.dispatch('signinUser', {
      email: res.data.userCredentials.email,
      password: res.data.userCredentials.password,
    })
  } catch (err) {
    throw new Error(`there was an error trying to generate a guest, ${err}`)
  }
}

export {
  signinUser,
  signupUser,
  signoutUser,
  requestGuest,
}
