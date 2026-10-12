import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';
import type { ItemId } from '@/common/types/item-id';

export type CommonSelectProps<ID extends ItemId = string> = InputBaseProps
  & SelectBaseProps
  & {
    options?: CommonSelectOption<ID>[];
  };

export type CommonSelectOption<ID extends ItemId = string> = SelectBaseOption<ID>;

export type CommonSelectSlots = InputBaseSlots
  & SelectBaseSlots;
