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

export type CommonInputMaskParams =
  | FactoryConstructorOpts
  | FactoryInstanceOpts
  | FactoryStaticOptionsWithoutLazy;

export type CommonInputMaskValues = {
  typedValue: string;
  maskedValue: string;
  unmaskedValue: string;
};

export type CommonInputProps = InputBaseProps
  & {
    name?: string;
    mask?: CommonInputMaskParams;
    theme?: 'text' | 'search';
    maskVisibility?: 'always' | 'onFocus';
    position?: 'left' | 'center' | 'right';
    type?: 'text' | 'number' | 'tel' | 'email' | 'password';
  };

export type CommonInputEmits = {
  'input': [value: string | number];
  'change': [value: string | number];
  'focus': [];
  'blur': [];
  'click:prepend': [];
  'click:append': [];
};

export type CommonInputSlots = InputBaseSlots
  & {
    prepend?: () => VNode[];
    append?: () => VNode[];
  };
