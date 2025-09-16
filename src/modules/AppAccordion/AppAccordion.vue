<script lang="ts" setup>
import type { AppAccordionSlots } from './types';

defineSlots<AppAccordionSlots>();
</script>

<template>
  <div class="app-accordion">
    <slot />
  </div>
</template>

<style lang="scss">
.app-accordion {
  display: flex;
  flex-flow: column nowrap;
}
</style>
