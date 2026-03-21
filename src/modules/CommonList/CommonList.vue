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

function marker(index: number): string | undefined {
  if (props.tag === 'ol') {
    return `${index + 1}.`;
  }

  return props.marker;
}
</script>

<template>
  <Component
    :is="tag"
    class="common-list"
  >
    <CommonListItem
      v-for="(item, index) in items"
      :key="item.id"
      :tag="props.tag"
      :marker="marker(index)"
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

<style lang="scss">
.common-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
