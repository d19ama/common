import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export interface AppSelectProps extends InputBaseProps {
  multiple?: boolean;
  options?: AppSelectOption[];
}

export interface AppSelectOption<ID extends string | number | symbol = string> {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppSelectSlots extends InputBaseSlots {
  [key: `select-item-${AppSelectOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
}
