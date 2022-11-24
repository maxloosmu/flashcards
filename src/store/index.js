import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      userId: null,
      token: null,
      error: "",
      response: "",
      mode: "login",
      name: "",
      email: "",
      password: "",
      subjects: [],
    };
  },
  mutations,
  actions,
  getters,
});

export default store;