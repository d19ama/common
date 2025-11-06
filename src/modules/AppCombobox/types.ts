import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from '@/common/components/SelectBase';

export interface AppComboboxProps
  extends
  InputBaseProps,
  SelectBaseProps {
  name?: string;
  loading?: boolean;
  searchError?: boolean;
}

export interface AppComboboxOption<ID extends string | number | symbol = string>
  extends SelectBaseOption<ID> {}

export interface AppComboboxEmits {
  focus: [];
  blur: [];
}

export interface AppComboboxSlots
  extends
  InputBaseSlots,
  SelectBaseSlots {}
