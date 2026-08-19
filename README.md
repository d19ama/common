# @d19ama/common

Общая библиотека UI-компонентов, композаблов, утилит, форматтеров и валидаторов
на Vue 3 (Composition API + `<script setup>`, строгая типизация TypeScript).

Библиотека спроектирована для использования как в обычных Vue 3 SPA-проектах,
так и внутри Nuxt 4 (SSR, SPA-режим и SSG) — все компоненты и композаблы
безопасны при серверном рендеринге (не обращаются к `window`/`document`
на этапе рендера на сервере, используют `useId()` для идентификаторов,
стабильных между SSR и гидратацией, и т.д.).

## Установка

```sh
npm install @d19ama/common
```

Пакет объявляет `vue` и `vue-router` как `peerDependencies` — они не входят
в сборку библиотеки и должны быть установлены в хост-проекте в единственном
экземпляре (это обязательное условие корректной работы Composition API,
Teleport и гидратации в SSR).

## Использование в Vue 3 SPA

### Глобальная регистрация всех компонентов (опционально)

```ts
// main.ts
import { createApp } from 'vue';
import CommonPlugin from '@d19ama/common';
import '@d19ama/common/style.css';
import App from './App.vue';

createApp(App)
  .use(CommonPlugin)
  .mount('#app');
```

### Точечный импорт (рекомендуется для оптимального tree-shaking)

```ts
import {
  CommonButton,
  CommonInput,
  formatPrice,
  useCommonBreakpoints,
} from '@d19ama/common';

import '@d19ama/common/style.css';
```

## Использование в Nuxt 4

Библиотека не содержит собственного Nuxt-модуля — она подключается как
обычный Vue-плагин через `plugins/`, что даёт полный контроль над тем,
что и когда регистрируется, и не требует специального Nuxt-адаптера.

1. Установите зависимость:

```sh
npm install @d19ama/common
```

2. Подключите стили в `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: [
    '@d19ama/common/style.css',
  ],
});
```

3. (Опционально) создайте плагин для глобальной регистрации компонентов
   `plugins/common.ts`:

```ts
import CommonPlugin from '@d19ama/common';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CommonPlugin);
});
```

Плагин безопасен для запуска в любом режиме (`ssr: true/false`, а также
для `nuxi generate`/SSG) — регистрация компонентов и `provide` не обращаются
к браузерным API.

4. Импортируйте компоненты и утилиты напрямую по месту использования —
   это работает одинаково в `<script setup>` компонентов страниц, composables
   и server-only коде (утилиты, форматтеры, валидаторы не зависят от Vue
   и DOM):

```vue
<script setup lang="ts">
import {
  CommonButton,
  formatPrice,
} from '@d19ama/common';
</script>
```

### Auto-import компонентов в Nuxt (опционально)

Чтобы использовать компоненты без явного импорта (как встроенные Nuxt
компоненты), добавьте алиас в `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  components: [
    {
      path: 'node_modules/@d19ama/common/dist',
      prefix: '',
      extensions: ['.js'],
      pathPrefix: false,
    },
  ],
});
```

Явный импорт компонентов остаётся предпочтительным способом использования,
так как гарантирует корректную работу `vue-tsc`/typescript-плагина Volar
и предсказуемое дерево зависимостей.

## Совместимость с SSR

- Все компоненты, обращающиеся к `window`/`document` (например, `CommonModal`,
  `CommonImage`, `CommonDatePicker`, `SelectBase`), делают это только внутри
  `onMounted`/`watch`-колбэков или с явной проверкой `typeof window/document`,
  что исключает падение при рендере на сервере.
- Идентификаторы компонентов (`useComponentId`) генерируются через нативный
  Vue `useId()`, гарантирующий совпадение значений на сервере и клиенте.
- Анимации (`CommonAccordion`) реализованы на нативных CSS-transition без
  сторонних библиотек, обращающихся к глобальным браузерным объектам на
  этапе импорта модуля.

## Разработка

```sh
npm run dev              # локальный дев-сервер (src/App.vue)
npm run dev:storybook    # Storybook
npm run build            # сборка библиотеки (dist/)
npm run type-check       # проверка типов (vue-tsc)
npm run test             # unit-тесты (vitest)
npm run lint             # ESLint с автофиксом
```
