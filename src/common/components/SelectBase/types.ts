import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export interface SelectBaseProps {
  loading?: boolean;
  placeholder?: string;
  dropdownVisible?: boolean;
  validation?: BaseValidation;
}

export interface SelectBaseOption<ID extends string | number | symbol = string> {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface SelectBaseEmits {
  'click': [];
  'change:selected': [value: SelectBaseOption];
}

export interface SelectBaseSlots {
  [key: `select-item-${SelectBaseOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
  'default'?: () => VNode[];
  'icon'?: () => VNode[];
  'option-text'?: () => VNode[];
  'option-icon'?: () => VNode[];
  'append-dropdown'?: () => VNode[];
}
