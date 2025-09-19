import type { VNode } from 'vue';
import type {
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
  disabled?: boolean;
  theme?: AppCheckboxTheme;
}

export interface AppCheckboxSlots {
  default?: () => VNode[];
}
