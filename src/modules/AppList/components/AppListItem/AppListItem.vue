<script lang="ts" setup>
import { computed } from 'vue';
import type {
  AppListItemProps,
  AppListItemSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppListItemProps>(), {
  tag: 'ul',
  prepend: '//',
  noMarkers: false,
});

defineSlots<AppListItemSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-list-item--${props.tag}`,
  ];
});
</script>

<template>
  <li
    class="app-list-item"
    :data-prepend="props.prepend"
    :class="elementClass"
  >
    <slot />
  </li>
</template>

<style lang="scss">
.app-list-item {
  padding-left: 2rem;
  position: relative;
  line-height: 1.5;
  font-size: .875rem;

  & + & {
    margin: .5rem 0 0;
  }

  &--ul {

    &:before {
      content: attr(data-prepend);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      font-weight: 700;
      color: var(--common-color-ui-secondary);
    }
  }

  &--ol {

    &:before {
      counter-increment: list;
      content: counter(list);
      width: 1.25rem;
      text-align: left;
      font-weight: 500;
      color: var(--common-color-ui-secondary);
    }
  }

  &--no-markers {

    &:before {
      display: none;
    }
  }
}
</style>
