import type { VNode } from 'vue';

export type CommonAccordionProps = {
  multiple?: boolean;
};

export type CommonAccordionSlots = {
  default?: () => VNode[];
};
