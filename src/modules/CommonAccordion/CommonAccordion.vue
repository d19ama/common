<script lang="ts" setup>
import { provide } from 'vue';
import type {
  CommonAccordionProps,
  CommonAccordionSlots,
} from './types';

const props = withDefaults(defineProps<CommonAccordionProps>(), {
  multiple: false,
});

defineSlots<CommonAccordionSlots>();

provide<boolean>('multiple', props.multiple);
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
