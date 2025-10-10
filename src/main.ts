import { createApp } from 'vue';
import { RouterLinkStub } from '@vue/test-utils';
import App from './App.vue';

import '@/assets/styles/index.scss';

createApp(App)
  .component('RouterLink', RouterLinkStub)
  .mount('#app');
