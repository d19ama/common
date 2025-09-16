import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export interface AppTextareaProps extends InputBaseProps {
  name?: string;
  resize?: boolean;
}

export interface AppTextareaEmits {
  blur: [];
  focus: [];
  input: [value: string];
  change: [value: string];
}

export interface AppTextareaSlots extends InputBaseSlots {}
