import type { VNode } from 'vue';
import type { GlobalPropTheme } from '@/types';

export type AppLinkTheme = GlobalPropTheme;

export type AppLinkTarget = '_blank' | '_self';

export interface AppLinkProps {
  url?: string;
  text?: string;
  prevent?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  theme?: AppLinkTheme;
  target?: AppLinkTarget;
}

export interface AppLinkEmits {
  click: [event: Event];
}

export interface AppLinkSlots {
  default?: () => VNode[];
}
