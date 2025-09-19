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
});

defineSlots<AppDatePickerSlots>();

const date = defineModel<AppDatePickerModel>('date', {
  required: false,
});

const error = ref<boolean>(false);

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
      <div class="app-date-picker__picker">
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
          :offset="offset"
          @blur="onBlur"
        />
      </div>
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
$padding: 1rem;

.app-date-picker {

  &__picker  {
    display: block;
    width: 100%;
    padding: $padding 0;
  }

  .dp__theme_light {
    --dp-background-color: var(--common-base-input-wrapper-bg);
    --dp-text-color: var(--common-color-text-main);
    --dp-border-color: var(--common-base-input-wrapper-border-color);
    --dp-menu-border-color: var(--common-base-input-wrapper-border-color);
    --dp-border-color-hover: none;
    --dp-border-color-focus: none;
    --dp-icon-color: var(--common-color-ui-primary);

    --dp-border-radius: var(--common-base-input-wrapper-border-radius);
    --dp-font-size: .875rem;
    --dp-preview-font-size: .875rem;
    --dp-time-font-size: .875rem;
    --dp-input-padding: $padding;
    --dp-input-icon-padding: 2.5rem;

    --dp-primary-color: var(--common-color-text-main);

    --dp-font-family: var(--common-font-family), Arial, Helvetica, sans-serif;

    ::placeholder {
      color: rgba(var(--common-color-text-main), .5);
    }

    .dp__input_icons {
      padding: 0 $padding;
    }
  }
}
</style>
