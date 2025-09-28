import type { VNode } from 'vue';
import type { GlobalPropSize } from '@/types';

export interface DropdownProps {
  loading?: boolean;
  size?: GlobalPropSize;
}

export interface DropdownItem<ID extends string | number | symbol = string> {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface DropdownEmits {
  'change:selected': [value: DropdownItem];
}

export interface DropdownSlots {
  [key: `dropdown-item-${DropdownItem['id']}`]: (scope: {
    text: string;
  }) => VNode[];
  'item-text'?: () => VNode[];
  'item-icon'?: () => VNode[];
  'append'?: () => VNode[];
}
