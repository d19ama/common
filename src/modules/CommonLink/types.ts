import type { VNode } from 'vue';
import type { CommonGlobalPropTheme } from '@/types';

export type CommonLinkTheme = CommonGlobalPropTheme;

export type CommonLinkTarget = '_blank' | '_self';

export interface CommonLinkProps {
  url?: string;
  text?: string;
  prevent?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  theme?: CommonLinkTheme;
  target?: CommonLinkTarget;
}

export interface CommonLinkEmits {
  click: [event: Event];
}

export interface CommonLinkSlots {
  default?: () => VNode[];
}
