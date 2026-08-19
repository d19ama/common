import type {
  App,
  Component,
} from 'vue';
import * as modules from './modules';

export type CommonPluginOptions = Record<string, unknown>;

/**
 * Vue-плагин для глобальной регистрации всех компонентов библиотеки.
 *
 * Использование в Vue SPA:
 * ```ts
 * import { createApp } from 'vue';
 * import CommonPlugin from '@d19ama/common';
 *
 * createApp(App).use(CommonPlugin);
 * ```
 *
 * Использование в Nuxt 4 (плагин `plugins/common.ts`):
 * ```ts
 * import CommonPlugin from '@d19ama/common';
 *
 * export default defineNuxtPlugin((nuxtApp) => {
 *   nuxtApp.vueApp.use(CommonPlugin);
 * });
 * ```
 *
 * Глобальная регистрация компонентов не обязательна — все компоненты,
 * композаблы, утилиты и т.д. можно импортировать напрямую по месту
 * использования, что предпочтительнее для tree-shaking.
 */
export function install(app: App, options: CommonPluginOptions = {}): void {
  Object.entries(modules).forEach(([
    name,
    component,
  ]) => {
    // Приведение типа необходимо из‑за наличия среди модулей generic-компонентов
    // (например, CommonTabs), чей публичный тип несовместим с сигнатурой
    // `app.component()`, ожидающей нежёсткий `Component`. На рантайм-поведение
    // и типизацию при прямом импорте компонента это не влияет.
    app.component(name, component as Component);
  });

  app.provide('d19amaCommon', {
    options,
  });
}

export default {
  install,
};

export * from './modules';
export * from './composables';

export * as utils from './utils';
export * as format from './format';
export * as helpers from './helpers';
export * as plugins from './plugins';
export * as constants from './constants';
export * as validators from './validators';

export type * from './types';
