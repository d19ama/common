<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = defineProps<InputBaseProps>();

const slots = defineSlots<InputBaseSlots>();

const error = ref<boolean>(false);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'input-base--disabled': props.disabled,
  };
});

const errorMessage = computed<string | undefined>(() => {
  if (props.errorText) {
    return props.errorText;
  }

  if (props.validation) {
    return props.validation.$errors.map(({
      $message,
    }) => $message.toString()).at(0);
  }

  return undefined;
});

const isErrorVisible = computed<boolean>(() => {
  return props.required
    && error.value
    && !!errorMessage.value;
});
</script>

<template>
  <div
    class="input-base"
    :class="elementClass"
  >
    <div
      v-if="hasLabel"
      class="input-base__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="input-base__label-asterisk"
      >*</span>
    </div>

    <div class="input-base__wrapper">
      <slot />
    </div>

    <span
      v-if="isErrorVisible"
      class="input-base__error"
    >
      <slot name="error">
        {{ errorMessage }}
      </slot>
    </span>
    <span
      v-if="hasHint && !isErrorVisible"
      class="input-base__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
.input-base {
  $parent: &;
  $padding: 1rem;

  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  gap: .25rem;
  position: relative;

  &__wrapper {
    display: flex;
    width: 100%;
    position: relative;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
  }

  &__label,
  &__error,
  &__hint {
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.4;
  }

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: .125rem;
    width: 100%;
    color: var(--color-gray-dark);
    user-select: none;
  }

  &__label-asterisk {
    color: var(--color-red);
  }

  &__placeholder {
    display: block;
    max-width: 100%;
    opacity: .5;
    overflow: hidden;
    padding: $padding;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--color-gray-dark);
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__hint {
    opacity: .5;
    color: var(--color-gray-dark);
  }

  &__error {
    color: var(--color-red);
  }

  &--disabled {
    opacity: .4;
    pointer-events: none;
  }
}
</style>
