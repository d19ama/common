import type { VNode } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type {
  CommonGlobalPropSize,
  CommonGlobalPropTheme,
} from '@/types';
import type { CommonGlobalPropTextStyle } from '@/types/global-props';

export type CommonButtonSize = CommonGlobalPropSize;

export type CommonButtonTheme = CommonGlobalPropTheme | 'icon';

export type CommonButtonThemeStyle = 'fill' | 'outline';

export type CommonButtonBlank = '_blank' | '_self';

export type CommonButtonTag = 'button' | 'RouterLink' | 'a';

export type CommonButtonTextStyle = CommonGlobalPropTextStyle;

export type CommonButtonProps = {
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
};

export type CommonButtonEmits = {
  click: [event: Event];
};

export type CommonButtonSlots = {
  default?: () => VNode[];
  prepend?: () => VNode[];
  append?: () => VNode[];
};
