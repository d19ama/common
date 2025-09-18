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

const props = withDefaults(defineProps<AppTextareaProps>(), {
  hint: '',
  label: '',
  resize: false,
  required: false,
  disabled: false,
  errorText: '',
  placeholder: '',
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
  return {
    'app-textarea--resizable': props.resize,
  };
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
          class="app-textarea__textarea"
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
    height: 8rem;
    position: relative;
    padding: 1rem 1.5rem 1rem 1rem;
  }

  &__textarea {
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

  &--resizable {

    #{$parent}__textarea {
      resize: both;
    }
  }
}
</style>
