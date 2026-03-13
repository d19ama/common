import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';

export interface CommonComboboxProps
  extends
  InputBaseProps,
  SelectBaseProps {
  name?: string;
  loading?: boolean;
  searchError?: boolean;
}

export interface CommonComboboxOption<ID extends string | number | symbol = string>
  extends SelectBaseOption<ID> {}

export interface CommonComboboxEmits {
  focus: [];
  blur: [];
}

export interface CommonComboboxSlots
  extends
  InputBaseSlots,
  SelectBaseSlots {}
