import type { VNode } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type {
  GlobalPropSize,
  GlobalPropTheme,
} from '@/types';
import type { GlobalPropTextStyle } from '@/types/global-props';

export type CommonButtonSize = GlobalPropSize;

export type CommonButtonTheme = GlobalPropTheme | 'icon';

export type CommonButtonThemeStyle = 'fill' | 'outline';

export type CommonButtonBlank = '_blank' | '_self';

export type CommonButtonTag = 'button' | 'RouterLink' | 'a';

export type CommonButtonTextStyle = GlobalPropTextStyle;

export interface CommonButtonProps {
  text?: string;
  href?: string;
  flat?: boolean;
  loading?: boolean;
  tag?: CommonButtonTag;
  download?: boolean;
  disabled?: boolean;
  autoWidth?: boolean;
  size?: CommonButtonSize;
  to?: RouteLocationRaw;
  downloadName?: string;
  theme?: CommonButtonTheme;
  target?: CommonButtonBlank;
  textStyle?: CommonButtonTextStyle;
  themeStyle?: CommonButtonThemeStyle;
  type?: HTMLButtonElement['type'];
}

export interface CommonButtonEmits {
  click: [event: Event];
}

export interface CommonButtonSlots {
  default?: () => VNode[];
  prepend?: () => VNode[];
  append?: () => VNode[];
}
