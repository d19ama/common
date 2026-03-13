import type { VNode } from 'vue';
import type {
  CommonGlobalPropSize,
  CommonGlobalThemeForm,
  CommonGlobalThemePrimary,
  CommonGlobalThemeSecondary,
  CommonGlobalThemeTertiary,
  CommonGlobalThemeUnaccented,
} from '@/types/global-props';

export type CommonCheckboxTheme =
  | CommonGlobalThemePrimary
  | CommonGlobalThemeSecondary
  | CommonGlobalThemeTertiary
  | CommonGlobalThemeUnaccented
  | CommonGlobalThemeForm;

export interface CommonCheckboxProps {
  name?: string;
  text?: string;
  required?: boolean;
  disabled?: boolean;
  size?: CommonGlobalPropSize;
  theme?: CommonCheckboxTheme;
}

export interface CommonCheckboxSlots {
  default?: () => VNode[];
}
