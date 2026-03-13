import type { VNode } from 'vue';
import type {
  GlobalPropSize,
  GlobalThemeForm,
  GlobalThemePrimary,
  GlobalThemeSecondary,
  GlobalThemeTertiary,
  GlobalThemeUnaccented,
} from '@/types/global-props';

export type CommonCheckboxTheme =
  | GlobalThemePrimary
  | GlobalThemeSecondary
  | GlobalThemeTertiary
  | GlobalThemeUnaccented
  | GlobalThemeForm;

export interface CommonCheckboxProps {
  name?: string;
  text?: string;
  required?: boolean;
  disabled?: boolean;
  size?: GlobalPropSize;
  theme?: CommonCheckboxTheme;
}

export interface CommonCheckboxSlots {
  default?: () => VNode[];
}
