import type { VNode } from 'vue';
import type { CommonListProps } from '../../';

export type CommonListItemProps = Omit<CommonListProps, 'items'>
  & {
    prepend?: string;
  };

export type CommonListItemSlots = {
  default?: () => VNode[];
};
