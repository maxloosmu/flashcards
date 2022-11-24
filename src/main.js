import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import VueSimpleAlert from "vue3-simple-alert-next";

const app = createApp(App)

app.use(VueSimpleAlert);
app.use(router);
app.use(store);

app.mount('#app');