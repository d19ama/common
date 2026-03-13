<script lang="ts" setup>
import type { CommonAccordionSlots } from './types';

defineSlots<CommonAccordionSlots>();
</script>

<template>
  <div class="common-accordion">
    <slot />
  </div>
</template>

<style lang="scss">
.common-accordion {
  display: flex;
  flex-flow: column nowrap;
}
</style>
