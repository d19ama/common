import type { VNode } from 'vue';

export type CommonTabsItem<T extends string = string> = {
  id: T;
  label?: string;
  active: boolean;
  disabled?: boolean;
  align?: 'left' | 'right';
};

export type CommonTabsSlots = {
  [key: `tab-${CommonTabsItem['id']}`]: (scope: {
    text?: string;
  }) => VNode[];
};
