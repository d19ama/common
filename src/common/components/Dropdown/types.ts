import type { VNode } from 'vue';
import type { CommonGlobalPropSize } from '@/types';
import type { ItemId } from '@/common/types/item-id';

export type DropdownProps = {
  loading?: boolean;
  multiple?: boolean;
  size?: CommonGlobalPropSize;
};

export type DropdownItem<ID extends ItemId = string> = {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
};

export type DropdownEmits<ID extends ItemId = string> = {
  'change:selected': [option: DropdownItem<ID>, options: DropdownItem<ID>[]];
};

export type DropdownSlots = {
  [key: `dropdown-item-${string}`]: (scope: {
    text: string;
  }) => VNode[];
  'item-text'?: () => VNode[];
  'item-icon'?: () => VNode[];
  'append'?: () => VNode[];
};
