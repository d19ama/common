import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';
import type { CommonGlobalPropSize } from '@/types';
import type {
  DropdownEmits,
  DropdownItem,
} from '@/common/components/Dropdown';
import type { OptionId } from '@/common/types/option-id';

export type SelectBaseProps = {
  loading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: CommonGlobalPropSize;
  dropdownVisible?: boolean;
  validation?: BaseValidation;
};

export type SelectBaseOption<ID extends OptionId = string> = DropdownItem<ID>;

export type SelectBaseEmits<ID extends OptionId = string> = DropdownEmits<ID>
  & {
    click: [];
  };

export type SelectBaseSlots = {
  [key: `select-item-${string}`]: (scope: {
    text: string;
  }) => VNode[];
  'default'?: () => VNode[];
  'icon'?: () => VNode[];
  'option-text'?: () => VNode[];
  'option-icon'?: () => VNode[];
  'append-dropdown'?: () => VNode[];
};
