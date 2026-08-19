import { URL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dtsPlugin from 'vite-plugin-dts';

// Зависимости, которые не должны попадать в бандл библиотеки:
// - vue/vue-router — обязаны быть единственным экземпляром в хост-приложении
//   (иначе в Nuxt/SSR ломаются composition API context, teleport, hydration и т.д.);
// - остальные — достаточно тяжёлые независимые пакеты, которые хост-приложение
//   (в т.ч. Nuxt) должно резолвить самостоятельно, избегая дублирования в бандле.
const EXTERNAL_DEPENDENCIES: string[] = [
  'vue',
  'vue-router',
  '@vueuse/core',
  'dayjs',
  'imask',
  'vue-tippy',
  '@vuepic/vue-datepicker',
  '@vuelidate/core',
  '@vuelidate/validators',
  '@sniptt/guards',
];

export default defineConfig((): UserConfig => {
  return {
    plugins: [
      vue(),
      dtsPlugin({
        tsconfigPath: 'tsconfig.app.json',
        cleanVueFileName: true,
        copyDtsFiles: true,
      }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      target: [
        'chrome98',
        'edge98',
        'firefox97',
        'safari15',
      ],
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Common',
        fileName: format => `common.${format}.js`,
      },
      rollupOptions: {
        external: (id: string) => {
          // CSS-файлы сторонних пакетов (например, стили datepicker/tippy)
          // должны попадать в итоговый style.css библиотеки, поэтому их
          // не помечаем как external, даже если сам пакет — внешняя зависимость.
          if (id.endsWith('.css'))
            return false;

          return EXTERNAL_DEPENDENCIES.some((dependency) => {
            return id === dependency || id.startsWith(`${dependency}/`);
          });
        },
        output: {
          exports: 'named',
          globals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'imask': 'IMask',
            'dayjs': 'dayjs',
            '@vueuse/core': 'VueUse',
            'vue-tippy': 'VueTippy',
            '@sniptt/guards': 'guards',
            '@vuelidate/core': 'VuelidateCore',
            '@vuepic/vue-datepicker': 'VueDatePicker',
            '@vuelidate/validators': 'VuelidateValidators',
          },
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/assets/styles/globals.scss' as *;`,
        },
      },
    },
  };
});
