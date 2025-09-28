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
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<InputBaseProps>(), {
  required: false,
  disabled: false,
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

const slots = defineSlots<InputBaseSlots>();

const error = ref<boolean>(false);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `input-base--size-${props.size}`,
    {
      'input-base--disabled': props.disabled,
    },
  ];
});

const errorMessage = computed<string | undefined>(() => {
  if (props.errorText) {
    return props.errorText;
  }

  if (!props.validation) {
    return undefined;
  }

  const [
    first,
  ] = props.validation.$errors.map(({
    $message,
  }) => $message.toString());

  if (first) {
    return first;
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
      <sup
        v-if="props.required"
        class="input-base__label-required"
      >*</sup>
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
// RESET
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

input {
  overflow: visible;
}

textarea {
  overflow: auto;
}

select {
  text-transform: none;
}

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

// COMPONENT STYLES
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
    border-radius: var(--common-input-base-wrapper-border-radius);
    border: var(--common-input-base-wrapper-border);
    background-color: var(--common-input-base-wrapper-bg);
  }

  &__label,
  &__error,
  &__hint {
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
    color: var(--common-input-base-label-color);
    user-select: none;
  }

  &__label-required {
    color: var(--common-input-base-label-required-color);
  }

  &__hint {
    color: var(--common-input-base-hint-color);
  }

  &__error {
    color: var(--common-input-base-error-color);
  }

  &--size-xs {
    gap: .125rem;

    #{$parent}__label,
    #{$parent}__error,
    #{$parent}__hint {
      font-size: .5rem;
    }
  }

  &--size-sm {
    gap: .125rem;

    #{$parent}__label,
    #{$parent}__error,
    #{$parent}__hint {
      font-size: .625rem;
    }
  }

  &--size-md {

    #{$parent}__label,
    #{$parent}__error,
    #{$parent}__hint {
      font-size: .75rem;
    }
  }

  &--size-lg {

    #{$parent}__label,
    #{$parent}__error,
    #{$parent}__hint {
      font-size: .875rem;
    }
  }

  &--size-xl {

    #{$parent}__label,
    #{$parent}__error,
    #{$parent}__hint {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4;
    }
  }

  &--disabled {
    opacity: .4;
    pointer-events: none;
  }
}
</style>
