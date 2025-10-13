<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import type {
  AppDatePickerModel,
  AppDatePickerProps,
  AppDatePickerSlots,
} from './types';
import '@vuepic/vue-datepicker/dist/main.css';
import { InputBase } from '@/common/components/InputBase';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppDatePickerProps>(), {
  hint: '',
  range: false,
  errorText: '',
  placeholder: '',
  autoApply: true,
  disabled: false,
  position: 'left',
  yearPicker: false,
  monthPicker: false,
  modelType: 'format',
  format: 'yyyy.MM.dd',
  enableTimePicker: false,
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

defineSlots<AppDatePickerSlots>();

const date = defineModel<AppDatePickerModel>('date', {
  required: false,
});

const error = ref<boolean>(false);

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-date-picker--size-${props.size}`,
  ];
});

const offset = computed<number>(() => {
  const htmlElement: HTMLElementTagNameMap['html'] | null = document.querySelector('html');

  if (!htmlElement) {
    return 0;
  }

  const fontSize: string = window.getComputedStyle(htmlElement, null).fontSize;
  const fontSizeNumber: string = fontSize.replace(/[^\d-]/g, '');

  return Number(fontSizeNumber) * 1.5;
});

function onBlur(): void {
  validate();
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}
</script>

<template>
  <InputBase
    class="app-date-picker"
    :hint="props.hint"
    :size="props.size"
    :label="props.label"
    :class="elementClass"
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
      <div class="app-date-picker__field">
        <VueDatePicker
          v-model="date"
          :range="props.range"
          :format="props.format"
          :min-date="props.minDate"
          :max-date="props.maxDate"
          :position="props.position"
          :auto-apply="props.autoApply"
          :model-type="props.modelType"
          :year-picker="props.yearPicker"
          :placeholder="props.placeholder"
          :month-picker="props.monthPicker"
          :enable-time-picker="props.enableTimePicker"
          :offset="offset"
          @blur="onBlur"
        />
      </div>
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
.app-date-picker {
  $parent: &;

  &__field  {
    display: block;
    width: 100%;

    .dp__input {
      border: none;
    }
  }

  .dp__theme_light {
    --dp-background-color: var(--common-input-base-wrapper-bg);
    --dp-text-color: var(--common-color-main);
    --dp-border-color: var(--common-input-base-wrapper-border-color);
    --dp-menu-border-color: var(--common-input-base-wrapper-border-color);
    --dp-border-color-hover: none;
    --dp-border-color-focus: none;
    --dp-icon-color: var(--common-color-ui-primary);

    --dp-border-radius: var(--common-input-base-wrapper-border-radius);

    --dp-primary-color: var(--common-color-main);

    --dp-font-family: var(--common-font-family), Arial, Helvetica, sans-serif;

    ::placeholder {
      color: rgba(var(--common-color-main), .5);
    }

    .dp__input_icons {
      padding: 0 1rem;
    }
  }

  // SIZES
  &--size-xs {
    .dp__theme_light {
      --dp-font-size: .625rem;
      --dp-preview-font-size: .625rem;
      --dp-time-font-size: .625rem;
      --dp-input-padding: .75rem;
      --dp-input-icon-padding: 2.25rem;
    }
  }

  &--size-sm {
    .dp__theme_light {
      --dp-font-size: .75rem;
      --dp-preview-font-size: .75rem;
      --dp-time-font-size: .75rem;
      --dp-input-padding: .875rem;
      --dp-input-icon-padding: 2.375rem;
    }
  }

  &--size-md {
    .dp__theme_light {
      --dp-font-size: .875rem;
      --dp-preview-font-size: .875rem;
      --dp-time-font-size: .875rem;
      --dp-input-padding: 1rem;
      --dp-input-icon-padding: 2.5rem;
    }
  }

  &--size-lg {
    .dp__theme_light {
      --dp-font-size: 1rem;
      --dp-preview-font-size: 1rem;
      --dp-time-font-size: 1rem;
      --dp-input-padding: 1.125rem;
      --dp-input-icon-padding: 2.625rem;
    }
  }

  &--size-xl {
    .dp__theme_light {
      --dp-font-size: 1.125rem;
      --dp-preview-font-size: 1.125rem;
      --dp-time-font-size: 1.125rem;
      --dp-input-padding: 1.25rem;
      --dp-input-icon-padding: 2.75rem;
    }
  }
}
</style>
