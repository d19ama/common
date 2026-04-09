<script setup lang="ts">
import type {
  CommonModalActionsProps,
  CommonModalActionsSlots,
} from './types';

withDefaults(defineProps<CommonModalActionsProps>(), {
  layout: 'row',
});

defineSlots<CommonModalActionsSlots>();
</script>

<template>
  <div
    class="common-modal-actions"
    :style="{
      flexDirection: $props.layout,
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.common-modal-actions {
  display: flex;
  gap: 1rem;
}
</style>
