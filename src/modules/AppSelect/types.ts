import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';

export interface AppSelectProps
  extends
  InputBaseProps,
  SelectBaseProps {
  options?: AppSelectOption[];
}

export interface AppSelectOption<ID extends string | number | symbol = string>
  extends SelectBaseOption<ID> {}

export interface AppSelectSlots
  extends
  InputBaseSlots,
  SelectBaseSlots {}
