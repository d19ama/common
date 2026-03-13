import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export interface CommonTextareaProps extends InputBaseProps {
  name?: string;
  resize?: boolean;
  enableCounter?: boolean;
}

export interface CommonTextareaEmits {
  blur: [];
  focus: [];
  input: [value: string];
  change: [value: string];
}

export interface CommonTextareaSlots extends InputBaseSlots {}
