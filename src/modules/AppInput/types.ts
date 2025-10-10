import type {
  FactoryConstructorOpts,
  FactoryInstanceOpts,
  FactoryStaticOpts,
  MaskedPatternOptions,
} from 'imask';
import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

type FactoryStaticOptionsWithoutLazy =
  | Exclude<FactoryStaticOpts, 'MaskedPatternOptions'>
  | Omit<Extract<FactoryStaticOpts, MaskedPatternOptions>, 'lazy' | 'eager'>;

export type AppInputMaskParams =
  | FactoryConstructorOpts
  | FactoryInstanceOpts
  | FactoryStaticOptionsWithoutLazy;

export interface AppInputMaskValues {
  typedValue: string;
  maskedValue: string;
  unmaskedValue: string;
}

export interface AppInputProps extends InputBaseProps {
  name?: string;
  mask?: AppInputMaskParams;
  theme?: 'text' | 'search';
  maskVisibility?: 'always' | 'onFocus';
  position?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
}

export interface AppInputEmits {
  'input': [value: string | number];
  'change': [value: string | number];
  'focus': [];
  'blur': [];
  'click:prepend': [];
  'click:append': [];
}

export interface AppInputSlots extends InputBaseSlots {
  prepend?: () => VNode[];
  append?: () => VNode[];
}
