<script setup lang="ts">
import type { CommonLineClampProps } from './types';

withDefaults(defineProps<CommonLineClampProps>(), {
  lines: 1,
});
</script>

<template>
  <span class="common-line-clamp">
    <slot />
  </span>
</template>

<style lang="scss">
.common-line-clamp {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: v-bind(lines);
  -webkit-box-orient: vertical;
  overflow-wrap: anywhere;
}
</style>
