import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';
import type { OptionId } from '@/common/types/option-id';

export type CommonSelectProps<ID extends OptionId = string> = InputBaseProps
  & SelectBaseProps
  & {
    options?: CommonSelectOption<ID>[];
  };

export type CommonSelectOption<ID extends OptionId = string> = SelectBaseOption<ID>;

export type CommonSelectSlots = InputBaseSlots
  & SelectBaseSlots;
