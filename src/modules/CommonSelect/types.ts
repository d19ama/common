import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';

export interface CommonSelectProps
  extends
  InputBaseProps,
  SelectBaseProps {
  options?: CommonSelectOption[];
}

export interface CommonSelectOption<ID extends string | number | symbol = string>
  extends SelectBaseOption<ID> {}

export interface CommonSelectSlots
  extends
  InputBaseSlots,
  SelectBaseSlots {}
