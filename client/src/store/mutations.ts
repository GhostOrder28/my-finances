import { UserData } from '@/types/store/state.types';
import storeState from './state';

function setUserId (state: UserData, userId: string) {
  state._id = userId
}

function setUsername (state: UserData, username: string) {
  state.username = username
}

function setEmail (state: UserData, email: string) {
  state.email = email
}

function resetState (state: UserData) {
  Object.assign(state, storeState())
}

export {
  setUserId,
  setUsername,
  setEmail,
  resetState,
}
