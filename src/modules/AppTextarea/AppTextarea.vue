<script lang="ts" setup>
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  ref,
} from 'vue';
import type {
  AppTextareaEmits,
  AppTextareaProps,
  AppTextareaSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { componentNameByInstance } from '@/helpers/component-name';
import { InputBase } from '@/common/components/InputBase';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<AppTextareaProps>(), {
  hint: '',
  label: '',
  resize: false,
  required: false,
  disabled: false,
  errorText: '',
  placeholder: '',
  maxLength: 999,
  enableCounter: true,
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

const emit = defineEmits<AppTextareaEmits>();

defineSlots<AppTextareaSlots>();

const value = defineModel<string>('value', {
  required: true,
});

const instance: ComponentInternalInstance | null = getCurrentInstance();

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-textarea--size-${props.size}`,
    {
      'app-textarea--resizable': props.resize,
    },
  ];
});

const name = computed<string>(() => {
  return props.name || componentNameByInstance(instance);
});

const counter = computed<number>(() => {
  return value.value.length;
});

const hasCounter = computed<boolean>(() => {
  return props.enableCounter && counter.value > 0;
});

function onInput(): void {
  emit('input', value.value);
}

function onChange(): void {
  emit('change', value.value);
}

function onFocus(): void {
  focus.value = true;
  emit('focus');
}

function onBlur(): void {
  validate();
  focus.value = false;
  emit('blur');
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}
</script>

<template>
  <InputBase
    class="app-textarea"
    :class="elementClass"
    :size="props.size"
    :hint="props.hint"
    :label="props.label"
    :required="props.required"
    :disabled="props.disabled"
    :error-text="props.errorText"
    :validation="props.validation"
    :placeholder="props.placeholder"
  >
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>

    <template #default>
      <div class="app-textarea__wrapper">
        <textarea
          v-model="value"
          cols="30"
          rows="10"
          :name="name"
          :maxLength="props.maxLength"
          class="app-textarea__field"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
          @change="onChange"
        />
      </div>
      <span
        v-if="hasCounter"
        class="app-textarea__counter"
      >
        {{ counter }}
      </span>
    </template>

    <template
      v-if="$slots.error"
      #error
    >
      <slot name="error" />
    </template>

    <template
      v-if="$slots.hint"
      #hint
    >
      <slot name="hint" />
    </template>
  </InputBase>
</template>

<style lang="scss">
.app-textarea {
  $parent: &;

  &__wrapper {
    width: 100%;
    position: relative;
  }

  &__field {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    resize: none;
    font-weight: 400;
    line-height: 1.5;
    color: var(--common-color-main);
    background-color: transparent;

    &:focus,
    &:hover {
      outline: 0 none;
    }

    &::placeholder {
      opacity: .5;
      color: var(--common-color-main-main);
    }
  }

  &__counter {
    width: 1rem;
    font-size: 0.5rem;
    position: absolute;
    right: 4px;
    bottom: 6px;
    text-align: center;
  }

  // SIZES
  &--size-xs {
    #{$parent}__wrapper {
      height: 4rem;
      padding: .75rem 1.25rem .75rem .75rem;
    }

    #{$parent}__field {
      font-size: .625rem;
    }
  }

  &--size-sm {
    #{$parent}__wrapper {
      height: 5rem;
      padding: .875rem 1.375rem .875rem .875rem;
    }

    #{$parent}__field {
      font-size: .75rem;
    }
  }

  &--size-md {
    #{$parent}__wrapper {
      height: 6rem;
      padding: 1rem 1.5rem 1rem 1rem;
    }

    #{$parent}__field {
      font-size: .875rem;
    }
  }

  &--size-lg {
    #{$parent}__wrapper {
      height: 7rem;
      padding: 1.125rem 1.625rem 1.125rem 1.125rem;
    }

    #{$parent}__field {
      font-size: 1rem;
    }
  }

  &--size-xl {
    #{$parent}__wrapper {
      height: 8rem;
      padding: 1.25rem 1.75rem 1.25rem 1.25rem;
    }

    #{$parent}__field {
      font-size: 1.125rem;
    }
  }

  // STATES
  &--resizable {

    #{$parent}__field {
      resize: both;
    }
  }
}
</style>
