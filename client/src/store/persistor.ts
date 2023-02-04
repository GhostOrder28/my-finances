import VuexPersistence from "vuex-persist";
import { User } from '#backend/user.types';
// import { initialState } from "./state";

const vuexPersistor = new VuexPersistence<Pick<User, 'username' | 'email'>>({
  storage: window.localStorage,
  // reducer: (state) => {
  //   console.log(state.email);
  //   if (!state.email.length) {
  //     return initialState;
  //   } else {
  //     return state;
  //   }
  // }
})

export default vuexPersistor;
