<script setup lang="ts">
import {
  AppSpinner,
  type AppSpinnerProps,
} from '../../';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<AppSpinnerProps>(), {
  size: GLOBAL_PROP_SIZE_DEFAULT,
});
</script>

<template>
  <div class="app-spinner-overlay">
    <AppSpinner
      :size="props.size"
    />
  </div>
</template>

<style lang="scss">
.app-spinner-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: var(--common-color-white-60);
}
</style>
