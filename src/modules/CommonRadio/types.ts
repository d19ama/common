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

export interface CommonRadioProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  size?: CommonGlobalPropSize;
  theme?: CommonRadioTheme;
  options?: CommonRadioOption[];
}

export interface CommonRadioEmits {
  input: [value: string];
  change: [value: string];
}

export interface CommonRadioOption {
  id: string;
  text: string;
  checked: boolean;
  disabled: boolean;
}

export interface CommonRadioSlots {
  [key: `radio-${CommonRadioOption['id']}`]: (scope: {
    text: CommonRadioOption['text'];
  }) => VNode[];
}
