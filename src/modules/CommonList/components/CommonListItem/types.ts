import type { VNode } from 'vue';
import type { CommonListProps } from '../../';

export type CommonListItemProps = Omit<CommonListProps, 'items'>
  & {
    marker?: string;
  };

export type CommonListItemSlots = {
  default?: () => VNode[];
};
