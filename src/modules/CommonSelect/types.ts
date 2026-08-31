import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';

export type CommonSelectProps = InputBaseProps
  & SelectBaseProps
  & {
    options?: CommonSelectOption[];
  };

export type CommonSelectOption<ID extends string | number | symbol | undefined = string> = SelectBaseOption<ID>;

export type CommonSelectSlots = InputBaseSlots
  & SelectBaseSlots;
