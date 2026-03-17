import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';
import type { CommonGlobalPropSize } from '@/types';
import type {
  DropdownEmits,
  DropdownItem,
} from '@/common/components/Dropdown';

export type SelectBaseProps = {
  loading?: boolean;
  placeholder?: string;
  size?: CommonGlobalPropSize;
  dropdownVisible?: boolean;
  validation?: BaseValidation;
};

export type SelectBaseOption<ID extends string | number | symbol = string> = DropdownItem<ID>;

export type SelectBaseEmits = DropdownEmits
  & {
    click: [];
  };

export type SelectBaseSlots = {
  [key: `select-item-${SelectBaseOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
  'default'?: () => VNode[];
  'icon'?: () => VNode[];
  'option-text'?: () => VNode[];
  'option-icon'?: () => VNode[];
  'append-dropdown'?: () => VNode[];
};
