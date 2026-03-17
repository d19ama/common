import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export type CommonTextareaProps = InputBaseProps
  & {
    name?: string;
    resize?: boolean;
    enableCounter?: boolean;
  };

export type CommonTextareaEmits = {
  blur: [];
  focus: [];
  input: [value: string];
  change: [value: string];
};

export type CommonTextareaSlots = InputBaseSlots;
