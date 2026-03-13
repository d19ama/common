<script lang="ts" setup>
import { computed } from 'vue';
import type {
  CommonTitleProps,
  CommonTitleSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<CommonTitleProps>(), {
  text: '',
  tag: 'h1',
  weight: 'bold',
  comment: false,
  inverted: false,
  bordered: false,
  uppercase: false,
});

defineSlots<CommonTitleSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `common-title--${props.tag}`,
    `common-title--${props.weight}`,
    {
      'common-title--comment': props.comment,
      'common-title--inverted': props.inverted,
      'common-title--bordered': props.bordered,
      'common-title--uppercase': props.uppercase,
    },
  ];
});
</script>

<template>
  <component
    :is="props.tag"
    class="common-title"
    :class="elementClass"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<style lang="scss">
.common-title {
  line-height: 1.25;
  color: var(--common-color-main);
  user-select: none;

  &--inverted {
    color: var(--common-color-inverted);
  }

  &--comment {
    padding-left: 5rem;
    position: relative;

    &:before {
      content: '//';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      color: var(--common-color-ui-secondary);
    }
  }

  &--bordered {
    padding-bottom: 1rem;
    border-bottom: 3px solid var(--common-color-ui-tertiary);
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--normal {
    font-weight: 400;
  }

  &--bold {
    font-weight: 700;
  }

  &--thin {
    font-weight: 300;
  }

  &--h1 {
    font-size: 2.5rem;
  }

  &--h2 {
    font-size: 2rem;
  }

  &--h3 {
    font-size: 1.75rem;
  }

  &--h4 {
    font-size: 1.5rem;
  }

  &--h5 {
    font-size: 1.25rem;
  }

  &--h6 {
    font-size: 1rem;
  }
}
</style>
