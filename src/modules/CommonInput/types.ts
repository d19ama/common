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

export type CommonInputMaskParams =
  | FactoryConstructorOpts
  | FactoryInstanceOpts
  | FactoryStaticOptionsWithoutLazy;

export type CommonInputMaskValues = {
  typedValue: string;
  maskedValue: string;
  unmaskedValue: string;
};

export type CommonInputPosition =
  | 'left'
  | 'center'
  | 'right';

export type CommonInputMaskVisibility =
  | 'always'
  | 'onFocus';

export type CommonInputType =
  | 'text'
  | 'number'
  | 'tel'
  | 'email'
  | 'password';

export type CommonInputProps = InputBaseProps
  & {
    name?: string;
    type?: CommonInputType;
    mask?: CommonInputMaskParams;
    position?: CommonInputPosition;
    maskVisibility?: CommonInputMaskVisibility;
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
    prepend?: [];
    append?: [];
  };
