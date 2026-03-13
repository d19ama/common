import type { VNode } from 'vue';
import type {
  GlobalPropSize,
  GlobalThemeForm,
  GlobalThemePrimary,
  GlobalThemeSecondary,
  GlobalThemeTertiary,
  GlobalThemeUnaccented,
} from '@/types/global-props';

export type CommonRadioTheme =
  | GlobalThemePrimary
  | GlobalThemeSecondary
  | GlobalThemeTertiary
  | GlobalThemeUnaccented
  | GlobalThemeForm;

export interface CommonRadioProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  size?: GlobalPropSize;
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
