import { createRouter, createWebHistory } from 'vue-router';

import UserLogin from './pages/UserLogin.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: UserLogin,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

export default router;
