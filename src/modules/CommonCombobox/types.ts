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

export type CommonComboboxProps = InputBaseProps
  & SelectBaseProps
  & {
    name?: string;
    loading?: boolean;
    searchError?: boolean;
  };

export type CommonComboboxOption<ID extends OptionId = string> = SelectBaseOption<ID>;

export type CommonComboboxEmits = {
  focus: [];
  blur: [];
};

export type CommonComboboxSlots = InputBaseSlots & SelectBaseSlots;
