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
    <template #label>
      <slot name="label" />
    </template>

    <template #default>
      <div class="app-textarea__wrapper">
        <textarea
          v-model="value"
          cols="30"
          rows="10"
          :name="name"
          maxLength="999"
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
        v-if="counter > 0"
        class="app-textarea__counter"
      >
        {{ counter }}
      </span>
    </template>

    <template #error>
      <slot name="error" />
    </template>

    <template #hint>
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
    line-height: 1.4;
    font-size: .875rem;
    color: var(--common-color-text-main);
    background-color: transparent;

    &:focus,
    &:hover {
      outline: 0 none;
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
      height: 6rem;
      padding: .75rem 1.25rem .75rem .75rem;
    }

    #{$parent}__field {
      font-size: .625rem;
    }
  }

  &--size-sm {
    #{$parent}__wrapper {
      height: 7rem;
      padding: .875rem 1.375rem .875rem .875rem;
    }

    #{$parent}__field {
      font-size: .75rem;
    }
  }

  &--size-md {
    #{$parent}__wrapper {
      height: 8rem;
      padding: 1rem 1.5rem 1rem 1rem;
    }

    #{$parent}__field {
      font-size: .875rem;
    }
  }

  &--size-lg {
    #{$parent}__wrapper {
      height: 9rem;
      padding: 1.125rem 1.625rem 1.125rem 1.125rem;
    }

    #{$parent}__field {
      font-size: 1rem;
    }
  }

  &--size-xl {
    #{$parent}__wrapper {
      height: 10rem;
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
