import type { VNode } from 'vue';

export interface CommonTabsItem<T extends string = string> {
  id: T;
  label?: string;
  active: boolean;
  disabled?: boolean;
  align?: 'left' | 'right';
}

export interface CommonTabsSlots {
  [key: `tab-${CommonTabsItem['id']}`]: (scope: {
    text?: string;
  }) => VNode[];
}
