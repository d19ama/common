<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';
import type {
  CommonImageEmits,
  CommonImageProps,
  CommonImageSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { CommonSpinner } from '@/modules';

const props = withDefaults(defineProps<CommonImageProps>(), {
  src: '',
  alt: '',
  objectFit: 'cover',
});

const emit = defineEmits<CommonImageEmits>();

defineSlots<CommonImageSlots>();

const loading = ref<boolean>(true);
const error = ref<boolean>(false);

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'common-image--flat': props.flat,
  };
});

const style = computed<string>(() => {
  return `object-fit: ${props.objectFit}`;
});

function onComplete(): void {
  loading.value = false;
  error.value = false;
  emit('load');
}

function onError(): void {
  loading.value = false;
  error.value = true;
  emit('error');
}

function loadImage(): void {
  loading.value = true;
  error.value = false;

  const image: HTMLImageElement = new Image();

  image.onload = () => onComplete();
  image.onerror = () => onError();
  image.src = props.src;
}

watch(
  () => props.src,
  () => loadImage(),
  {
    immediate: true,
  },
);
</script>

<template>
  <div
    class="common-image"
    :class="elementClass"
  >
    <CommonSpinner
      v-if="loading"
      class="common-image__spinner"
    />
    <template v-if="error">
      <slot name="no-image">
        <span>{{ props.alt }}</span>
      </slot>
    </template>
    <img
      v-else
      :src="props.src"
      :alt="props.alt"
      :style
      class="common-image__img"
    >
  </div>
</template>

<style lang="scss">
.common-image {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border-radius: var(--common-border-radius);
  background-color: var(--common-color-black-10);

  &__img {
    width: 100%;
    height: 100%;
    border-style: none;
  }

  &__spinner {
    position: absolute;
    z-index: 1;
  }

  &--flat {
    border-radius: 0;
  }
}
</style>
