import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export interface AppComboboxProps extends InputBaseProps {
  name?: string;
  loading?: boolean;
  multiple?: boolean;
  maxLength?: string;
  searchError?: boolean;
}

export interface AppComboboxOption<ID extends string | number | symbol = string> {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppComboboxEmits {
  focus: [];
  blur: [];
}

export interface AppComboboxSlots extends InputBaseSlots {
  [key: `combobox-${AppComboboxOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
}
