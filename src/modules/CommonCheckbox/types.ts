import type {
  CommonGlobalPropSize,
  CommonGlobalThemeForm,
  CommonGlobalThemePrimary,
  CommonGlobalThemeSecondary,
  CommonGlobalThemeTertiary,
  CommonGlobalThemeUnaccented,
} from '@/types/global-props';

/**
 * Значение модели может быть любым falsy-значением
 * (undefined, null, 0, '', false).
 * Приведение к boolean делается через `isChecked`.
 */
export type CommonCheckboxChecked = boolean | undefined | null;

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
