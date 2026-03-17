import type { VNode } from 'vue';

export type CommonTransitionProps = {
  name?: 'fade';
};

export type CommonTransitionSlots = {
  default?: () => VNode[];
};
