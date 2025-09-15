import type { RouteRecordRaw } from 'vue-router';
import { RouteNames } from '@/app/router/route-names';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import('@/pages/index.vue'),
    meta: {
      title: 'home',
    },
  },
  {
    path: '/demo',
    name: RouteNames.Demo,
    component: () => import('@/pages/demo.vue'),
    meta: {
      title: 'demo',
    },
  },
  {
    path: '/storybook',
    name: RouteNames.StoryBook,
    component: () => import('@/pages/storybook.vue'),
    meta: {
      title: 'storybook',
    },
  },
];
