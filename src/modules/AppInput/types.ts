import type {
  FactoryConstructorOpts,
  FactoryInstanceOpts,
  FactoryStaticOpts,
  MaskedPatternOptions,
} from 'imask';
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
  maxLength?: string;
  theme?: 'text' | 'search';
  position?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
  mask?: AppInputMaskParams;
  maskVisibility?: 'always' | 'onFocus';
}

export interface AppInputEmits {
  input: [value: string | number];
  change: [value: string | number];
  focus: [];
  blur: [];
}

export interface AppInputSlots extends InputBaseSlots {}
