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

export type CommonCheckboxProps = {
  name?: string;
  text?: string;
  required?: boolean;
  disabled?: boolean;
  size?: CommonGlobalPropSize;
  theme?: CommonCheckboxTheme;
};

export type CommonCheckboxSlots = {
  default?: [];
};
