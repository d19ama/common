import type { VNode } from 'vue';

export interface CommonModalActionsProps {
  layout?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

export interface CommonModalActionsSlots {
  default?: () => VNode[];
}
