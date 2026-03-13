<script lang="ts" setup>
import { computed } from 'vue';
import type {
  CommonLinkEmits,
  CommonLinkProps,
  CommonLinkSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { COMMON_GLOBAL_PROP_THEME_DEFAULT } from '@/constants/global-props';

const props = withDefaults(defineProps<CommonLinkProps>(), {
  url: '#',
  text: '',
  prevent: false,
  underline: true,
  target: '_blank',
  lineThrough: false,
  theme: COMMON_GLOBAL_PROP_THEME_DEFAULT,
});

const emit = defineEmits<CommonLinkEmits>();

defineSlots<CommonLinkSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `common-link--theme-${props.theme}`,
    {
      'common-link--underline': props.underline && !props.lineThrough,
      'common-link--line-through': !props.underline && props.lineThrough,
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
    class="common-link"
    :href="props.url"
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
