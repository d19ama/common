<script setup lang="ts">
import type { AppImageProps } from './types';

const props = withDefaults(defineProps<AppImageProps>(), {
  src: '',
  alt: '',
  loading: false,
});
</script>

<template>
  <div class="app-image">
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
.app-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: var(--common-border-radius);
}
</style>
