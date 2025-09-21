<script lang="ts" setup>
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import iMask, {
  type FactoryOpts,
  type InputMask,
} from 'imask';
import type {
  AppInputEmits,
  AppInputMaskValues,
  AppInputProps,
  AppInputSlots,
} from './types';
import { InputBase } from '@/common/components/InputBase';
import { componentNameByInstance } from '@/helpers/component-name';

const props = withDefaults(defineProps<AppInputProps>(), {
  hint: '',
  label: '',
  type: 'text',
  theme: 'text',
  errorText: '',
  disabled: false,
  required: false,
  placeholder: '',
  position: 'left',
  maskVisibility: 'onFocus',
});

const emit = defineEmits<AppInputEmits>();

defineSlots<AppInputSlots>();

const [
  value,
  modifiers,
] = defineModel<string>('value', {
  required: false,
  default: '',
  set(value) {
    if (modifiers.trim) {
      return value.trim();
    }

    return value;
  },
});

// Значение без маски
const unmasked = defineModel<string>('unmasked', {
  required: false,
  default: '',
});

// значение по типу
const typed = defineModel<string>('typed', {
  required: false,
  default: '',
});

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const inputRef = ref<HTMLInputElement | null>(null);
const maskRef = ref<InputMask<FactoryOpts> | undefined>(undefined);

const instance: ComponentInternalInstance | null = getCurrentInstance();

const name = computed<string>(() => {
  return props.name || componentNameByInstance(instance);
});

const maskParams = computed<FactoryOpts | undefined>(() => {
  if (props.mask) {
    return {
      ...props.mask,
      lazy: props.maskVisibility === 'onFocus',
      eager: props.maskVisibility === 'onFocus',
    };
  }

  return undefined;
});

function onChange(): void {
  emit('change', value.value);
}

function onInput(): void {
  emit('input', value.value);
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

function initMask(): void {
  if (!maskParams.value) {
    return;
  }

  const mask: InputMask<FactoryOpts> = iMask(inputRef.value as HTMLInputElement, maskParams.value)
    .on('accept', onMaskAccept);

  maskRef.value = mask;

  if (typed.value) {
    mask.typedValue = typed.value;
  }

  if (unmasked.value) {
    mask.unmaskedValue = unmasked.value;
  }

  onMaskAccept();
}

function updateMask(): void {
  if (!maskParams.value) {
    return;
  }

  maskRef.value?.updateOptions(maskParams.value);
}

function destroyMask(): void {
  maskRef.value?.destroy();
}

function getValues(): AppInputMaskValues {
  const typedValue = maskRef.value!.typedValue;
  const unmaskedValue = maskRef.value!.unmaskedValue;
  const maskedValue = maskRef.value!.value;

  return {
    typedValue,
    unmaskedValue,
    maskedValue,
  };
}

function onMaskAccept(): void {
  const {
    typedValue,
    maskedValue,
    unmaskedValue,
  }: AppInputMaskValues = getValues();

  value.value = maskedValue;
  typed.value = typedValue;
  unmasked.value = unmaskedValue;
}

onMounted(initMask);
onUnmounted(destroyMask);

watch(unmasked, (value) => {
  if (maskRef.value) {
    maskRef.value.unmaskedValue = value || '';
  }
});

watch(
  maskParams,
  (params) => {
    if (params) {
      if (!maskRef.value) {
        initMask();
      } else {
        updateMask();
      }
    } else {
      destroyMask();
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <InputBase
    class="app-input"
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
      <input
        ref="inputRef"
        v-model="value"
        :name="name"
        autocomplete="off"
        class="app-input__input"
        :type="props.type"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
        :placeholder="props.placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @change="onChange"
        @keyup.enter="onChange"
      >
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
.app-input {
  $parent: &;
  $padding: 1rem;

  &__input {
    width: 100%;
    border: none;
    padding: $padding;
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--common-color-text-main);
    background-color: transparent;

    &:hover,
    &:focus {
      outline: 0 none;
    }

    &:invalid {
      box-shadow: none;
    }

    &::-ms-clear {
      display: none;
    }

    &::placeholder {
      opacity: .5;
      color: var(--common-color-text-main);
    }
  }
}
</style>
