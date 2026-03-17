import type { VNode } from 'vue';

export type CommonModalActionsProps = {
  layout?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
};

export type CommonModalActionsSlots = {
  default?: () => VNode[];
};
