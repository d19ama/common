<script lang="ts" setup>
import type {
  AppListItemProps,
  AppListItemSlots,
} from './types';

const props = withDefaults(defineProps<AppListItemProps>(), {
  tag: 'ul',
  prepend: '//',
  noMarkers: false,
});

defineSlots<AppListItemSlots>();
</script>

<template>
  <li
    class="app-list-item"
    :data-prepend="props.prepend"
    :class="[`app-list-item--${props.tag}`]"
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
      color: var(--color-ui-middle);
    }
  }

  &--ol {

    &:before {
      counter-increment: list;
      content: counter(list);
      width: 1.25rem;
      text-align: left;
      font-weight: 500;
      color: var(--color-ui-middle);
    }
  }

  &--no-markers {

    &:before {
      display: none;
    }
  }
}
</style>
