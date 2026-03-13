import type { VNode } from 'vue';
import type { CommonListProps } from '../../';

export interface CommonListItemProps
  extends Omit<CommonListProps, 'items'> {
  prepend?: string;
}

export interface CommonListItemSlots {
  default?: () => VNode[];
}
