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
      allSubjectQuestions: [],
      txtFileContents: "",
      firebaseWebKey: process.env.VUE_APP_WEB_KEY,
    };
  },
  mutations,
  actions,
  getters,
});

export default store;