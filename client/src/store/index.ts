import { createStore, createLogger } from "vuex";
import state from './state';
import * as mutations from './mutations';
import * as actions from './actions';
import vuexPersistor from "./persistor";

export default createStore({
  state,
  mutations,
  actions,
  plugins: [vuexPersistor.plugin, createLogger()]
})

