<script lang="ts" setup>
import type { CommonDividerProps } from './types';

withDefaults(defineProps<CommonDividerProps>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <div
    class="common-divider"
    :class="[
      `common-divider--${orientation}`,
    ]"
  />
</template>

<style lang="scss">
.common-divider {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background: var(--common-divider-background);

  &--horizontal {
    width: 100%;
    height: var(--common-divider-width);
    margin: .5rem 0;
  }

  &--vertical {
    width: var(--common-divider-width);
    height: 100%;
    margin: 0 .5rem;
  }
}
</style>
