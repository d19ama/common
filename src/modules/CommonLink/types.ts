import type { VNode } from 'vue';
import type { CommonGlobalPropTheme } from '@/types';

export type CommonLinkTheme = CommonGlobalPropTheme;

export type CommonLinkTarget = '_blank' | '_self';

export type CommonLinkProps = {
  url?: string;
  text?: string;
  prevent?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  theme?: CommonLinkTheme;
  target?: CommonLinkTarget;
};

export type CommonLinkEmits = {
  click: [event: Event];
};

export type CommonLinkSlots = {
  default?: () => VNode[];
};
