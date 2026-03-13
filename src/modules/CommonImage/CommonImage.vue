<script setup lang="ts">
import type { CommonImageProps } from './types';

const props = withDefaults(defineProps<CommonImageProps>(), {
  src: '',
  alt: '',
  loading: false,
});
</script>

<template>
  <div class="common-image">
    <img
      :src="props.src"
      :alt="props.alt"
    >
  </div>
</template>

<style lang="scss">
// RESET
img {
  border-style: none;
}

// COMPONENT STYLES
.common-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: var(--common-border-radius);
}
</style>
