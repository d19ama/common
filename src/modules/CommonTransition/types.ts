import type { VNode } from 'vue';

export interface CommonTransitionProps {
  name?: 'fade';
}

export interface CommonTransitionSlots {
  default?: () => VNode[];
}
