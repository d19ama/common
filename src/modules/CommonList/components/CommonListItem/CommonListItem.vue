<script lang="ts" setup>
import { computed } from 'vue';
import type {
  CommonListItemProps,
  CommonListItemSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<CommonListItemProps>(), {
  tag: 'ul',
  marker: '//',
  noMarkers: false,
});

defineSlots<CommonListItemSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `common-list-item--${props.tag}`,
  ];
});
</script>

<template>
  <li
    class="common-list-item"
    :class="elementClass"
  >
    <span
      v-if="!props.noMarkers"
      class="common-list-item__marker"
    >
      {{ props.marker }}
    </span>
    <slot />
  </li>
</template>

<style lang="scss">
.common-list-item {
  display: flex;
  flex-flow: row nowrap;
  gap: .5rem;
  position: relative;
  line-height: 1.5;
  font-size: .875rem;

  & + & {
    margin: .5rem 0 0;
  }

  &__marker {
    flex-shrink: 0;
    font-weight: 700;
    color: var(--common-color-ui-secondary);
  }
}
</style>
