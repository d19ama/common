import type { VNode } from 'vue';
import type {
  CommonGlobalPropSize,
  CommonGlobalThemeForm,
  CommonGlobalThemePrimary,
  CommonGlobalThemeSecondary,
  CommonGlobalThemeTertiary,
  CommonGlobalThemeUnaccented,
} from '@/types/global-props';

export type CommonRadioTheme =
  | CommonGlobalThemePrimary
  | CommonGlobalThemeSecondary
  | CommonGlobalThemeTertiary
  | CommonGlobalThemeUnaccented
  | CommonGlobalThemeForm;

export type CommonRadioProps = {
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  size?: CommonGlobalPropSize;
  theme?: CommonRadioTheme;
  options?: CommonRadioOption[];
};

export type CommonRadioEmits = {
  input: [value: string];
  change: [value: string];
};

export type CommonRadioOption = {
  id: string;
  text: string;
  checked: boolean;
  disabled: boolean;
};

export type CommonRadioSlots = {
  [key: `radio-${CommonRadioOption['id']}`]: (scope: {
    text: CommonRadioOption['text'];
  }) => VNode[];
};
