import type { VNode } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type {
  GlobalPropSize,
  GlobalPropTheme,
} from '@/types';

export type AppButtonSize = GlobalPropSize;

export type AppButtonTheme = GlobalPropTheme;

export type AppButtonBlank = '_blank' | '_self';

export type AppButtonTag = 'button' | 'RouterLink' | 'a';

export interface AppButtonProps {
  text?: string;
  href?: string;
  loading?: boolean;
  rounded?: boolean;
  tag?: AppButtonTag;
  download?: boolean;
  disabled?: boolean;
  autoWidth?: boolean;
  size?: AppButtonSize;
  to?: RouteLocationRaw;
  downloadName?: string;
  theme?: AppButtonTheme;
  target?: AppButtonBlank;
  type?: HTMLButtonElement['type'];
}

export interface AppButtonEmits {
  click: [event: Event];
}

export interface AppButtonSlots {
  default?: () => VNode[];
  prepend?: () => VNode[];
  append?: () => VNode[];
}
