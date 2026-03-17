import type { VueDatePickerProps } from '@vuepic/vue-datepicker';
import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export type CommonDatePickerModel = Date | number | string | string[];

export type CommonDatePickerProps = InputBaseProps
  & {
    range?: VueDatePickerProps['range'];
    format?: VueDatePickerProps['format'];
    minDate?: VueDatePickerProps['minDate'];
    maxDate?: VueDatePickerProps['maxDate'];
    position?: VueDatePickerProps['position'];
    autoApply?: VueDatePickerProps['autoApply'];
    modelType?: VueDatePickerProps['modelType'];
    yearPicker?: VueDatePickerProps['yearPicker'];
    monthPicker?: VueDatePickerProps['yearPicker'];
    enableTimePicker?: VueDatePickerProps['enableTimePicker'];
  };

export type CommonDatePickerSlots = InputBaseSlots
  & {
    hint?: () => VNode[];
    label?: () => VNode[];
    error?: () => VNode[];
  };
