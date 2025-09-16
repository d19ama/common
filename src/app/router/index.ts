import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import { routes } from './routes';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title;
});
