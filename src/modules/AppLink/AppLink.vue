<script lang="ts" setup>
import { computed } from 'vue';
import type {
  AppLinkEmits,
  AppLinkProps,
  AppLinkSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppLinkProps>(), {
  url: '#',
  text: '',
  theme: 'primary',
  prevent: false,
  underline: true,
  target: '_blank',
});

const emit = defineEmits<AppLinkEmits>();

defineSlots<AppLinkSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-link--${props.theme}`,
    {
      'app-link--underline': props.underline,
    },
  ];
});

function onClick(event: Event): void {
  if (props.prevent) {
    event.preventDefault();
  }

  emit('click', event);
}
</script>

<template>
  <a
    :href="props.url"
    class="app-link"
    :class="elementClass"
    :target="props.target"
    @click="onClick"
  >
    <slot>
      {{ props.text }}
    </slot>
  </a>
</template>

<style lang="scss">
// RESET
a {
  background-color: transparent;
}

// COMPONENT STYLES
.app-link {
  color: var(--common-color-black);
  transition: color var(--common-transition);

  &:visited,
  &:focus,
  &:active {
    outline: 0 none;
  }

  // THEMES
  &--primary {
    color: var(--common-color-primary);

    &:hover {
      color: var(--common-color-primary-hover);
    }
  }

  &--secondary {
    color: var(--common-color-secondary);

    &:hover {
      color: var(--common-color-secondary-hover);
    }
  }

  &--tertiary {
    color: var(--common-color-tertiary);

    &:hover {
      color: var(--common-color-tertiary-hover);
    }
  }

  &--transparent {
    color: var(--common-color-text-main);
  }

  // STYLES
  &--underline {
    text-decoration: underline;
  }
}
</style>
