import { createRouter, createWebHistory } from 'vue-router';

import UserLogin from './pages/UserLogin.vue';
import NotFound from './pages/NotFound.vue';
import CreateQuestions from './pages/CreateQuestions.vue';
import TestYourself from './pages/TestYourself.vue';
import FileUpload from './pages/FileUpload.vue';

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
      component: NotFound,
    },
    {
      path: '/create',
      component: CreateQuestions,
    },
    {
      path: '/test',
      component: TestYourself,
    },
    {
      path: '/upload',
      component: FileUpload,
    },
  ]
});

export default router;
