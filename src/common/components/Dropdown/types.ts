import type { VNode } from 'vue';
import type { CommonGlobalPropSize } from '@/types';

export type DropdownProps = {
  loading?: boolean;
  size?: CommonGlobalPropSize;
};

export type DropdownItem<ID extends string | number | symbol = string> = {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
};

export type DropdownEmits = {
  'change:selected': [value: DropdownItem];
};

export type DropdownSlots = {
  [key: `dropdown-item-${DropdownItem['id']}`]: (scope: {
    text: string;
  }) => VNode[];
  'item-text'?: () => VNode[];
  'item-icon'?: () => VNode[];
  'append'?: () => VNode[];
};
