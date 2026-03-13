<script lang="ts" setup>
import { CommonListItem } from './components';
import type {
  CommonListProps,
  CommonListSlots,
} from './types';

const props = withDefaults(defineProps<CommonListProps>(), {
  tag: 'ul',
  items: () => [],
  noMarkers: false,
});

defineSlots<CommonListSlots>();
</script>

<template>
  <Component
    :is="tag"
    class="list"
  >
    <CommonListItem
      v-for="item in items"
      :key="item.id"
      :tag="props.tag"
      :no-markers="props.noMarkers"
    >
      <slot
        :name="`list-item-${String(item.id)}`"
        :data="item"
      >
        {{ item.label }}
      </slot>
    </CommonListItem>
  </Component>
</template>
