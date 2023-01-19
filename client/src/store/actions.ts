import { ActionContext, Commit } from 'vuex';
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
    throw new Error(`there was an error: ${err}`)
  }
}

async function signupUser (_: ActionContext<UserData, UserData>, signupData: SignupData) {
  const { username, email, password } = signupData;
  const res = await http.post<{ userCredentials: UserCredentials }>('/auth/signup', { username, email, password });
  store.dispatch('signinUser', {
    email: res.data.userCredentials.email,
    password: res.data.userCredentials.password,
  })
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
