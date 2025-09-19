import type { VNode } from 'vue';
import type {
  GlobalThemeForm,
  GlobalThemePrimary,
  GlobalThemeSecondary,
  GlobalThemeTertiary,
  GlobalThemeUnaccented,
} from '@/types/global-props';

export type AppRadioTheme =
  | GlobalThemePrimary
  | GlobalThemeSecondary
  | GlobalThemeTertiary
  | GlobalThemeUnaccented
  | GlobalThemeForm;

export interface AppRadioProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  theme?: AppRadioTheme;
  options?: AppRadioOption[];
}

export interface AppRadioEmits {
  input: [value: string];
  change: [value: string];
}

export interface AppRadioOption {
  id: string;
  text: string;
  checked: boolean;
  disabled: boolean;
}

export interface AppRadioSlots {
  [key: `radio-${AppRadioOption['id']}`]: (scope: {
    text: AppRadioOption['text'];
  }) => VNode[];
}
