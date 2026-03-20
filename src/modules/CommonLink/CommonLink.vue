<script lang="ts" setup>
import {
  computed,
  resolveComponent,
} from 'vue';
import type {
  CommonLinkProps,
  CommonLinkSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { COMMON_GLOBAL_PROP_THEME_DEFAULT } from '@/constants/global-props';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CommonLinkProps>(), {
  to: '',
  text: '',
  prevent: false,
  underline: true,
  lineThrough: false,
  theme: COMMON_GLOBAL_PROP_THEME_DEFAULT,
});

defineSlots<CommonLinkSlots>();

const RouterLink = resolveComponent('RouterLink');

const elementClass = computed<HTMLElementClass>(() => {
  return [
    'common-link',
    `common-link--theme-${props.theme}`,
    {
      'common-link--underline': props.underline && !props.lineThrough,
      'common-link--line-through': !props.underline && props.lineThrough,
    },
  ];
});

const isExternalLink = computed<boolean>(() => {
  return typeof props.to === 'string'
    && props.to.startsWith('http');
});
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :class="elementClass"
    :href="props.to as string"
    target="_blank"
  >
    <slot>
      {{ props.text }}
    </slot>
  </a>
  <RouterLink
    v-else
    :class="elementClass"
    :to="props.to"
  >
    <slot>
      {{ props.text }}
    </slot>
  </RouterLink>
</template>

<style lang="scss">
// RESET
a {
  background-color: transparent;
}

// COMPONENT STYLES
.common-link {
  color: var(--common-color-black);
  transition: color var(--common-transition);

  &:visited,
  &:focus,
  &:active {
    outline: 0 none;
  }

  // STYLES
  &--underline {
    text-decoration: underline;
  }

  &--line-through {
    text-decoration: line-through;
  }

  // THEMES
  &--theme-primary {
    color: var(--common-color-primary-light);

    &:hover {
      color: var(--common-color-primary-medium);
    }
  }

  &--theme-secondary {
    color: var(--common-color-secondary-light);

    &:hover {
      color: var(--common-color-secondary-medium);
    }
  }

  &--theme-tertiary {
    color: var(--common-color-tertiary-light);

    &:hover {
      color: var(--common-color-tertiary-medium);
    }
  }

  &--theme-unaccented {
    color: var(--common-color-unaccented-light);

    &:hover {
      color: var(--common-color-unaccented-medium);
    }
  }

  &--theme-transparent {
    color: var(--common-color-main);
  }
}
</style>
