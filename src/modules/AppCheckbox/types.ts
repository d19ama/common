import type { VNode } from 'vue';
import type {
  GlobalPropSize,
  GlobalThemeForm,
  GlobalThemePrimary,
  GlobalThemeSecondary,
  GlobalThemeTertiary,
  GlobalThemeUnaccented,
} from '@/types/global-props';

export type AppCheckboxTheme =
  | GlobalThemePrimary
  | GlobalThemeSecondary
  | GlobalThemeTertiary
  | GlobalThemeUnaccented
  | GlobalThemeForm;

export interface AppCheckboxProps {
  name?: string;
  text?: string;
  required?: boolean;
  disabled?: boolean;
  size?: GlobalPropSize;
  theme?: AppCheckboxTheme;
}

export interface AppCheckboxSlots {
  default?: () => VNode[];
}
