<script setup lang="ts">
import { computed } from 'vue';
import type {
  CommonImageEmits,
  CommonImageProps,
  CommonImageSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<CommonImageProps>(), {
  src: '',
  alt: '',
});

const emit = defineEmits<CommonImageEmits>();

defineSlots<CommonImageSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'common-image--flat': props.flat,
  };
});

function onLoadHandler(): void {
  emit('loaded');
}
</script>

<template>
  <div
    class="common-image"
    :class="elementClass"
  >
    <img
      v-if="props.src"
      :src="props.src"
      :alt="props.alt"
      class="common-image__img"
      @load="onLoadHandler"
    >
    <template v-else>
      <slot>
        <span>{{ props.alt }}</span>
      </slot>
    </template>
  </div>
</template>

<style lang="scss">
// RESET
img {
  border-style: none;
}

// COMPONENT STYLES
.common-image {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--common-border-radius);
  background-color: var(--common-color-black-10);

  &__img {
    object-fit: cover;
  }

  &--flat {
    border-radius: 0;
  }
}
</style>
