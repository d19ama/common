import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';
import type { GlobalPropSize } from '@/types';
import type {
  DropdownEmits,
  DropdownItem,
} from '@/common/components/Dropdown';

export interface SelectBaseProps {
  loading?: boolean;
  placeholder?: string;
  size?: GlobalPropSize;
  dropdownVisible?: boolean;
  validation?: BaseValidation;
}

export interface SelectBaseOption<ID extends string | number | symbol = string>
  extends DropdownItem<ID> {}

export interface SelectBaseEmits extends DropdownEmits {
  click: [];
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
