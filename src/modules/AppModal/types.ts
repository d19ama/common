import type { VNode } from 'vue';
import type { GlobalPropSize } from '@/types';

export type AppModalSize = GlobalPropSize | 'full-width' | 'full-page';

export interface AppModalProps {
  title?: string;
  appendTo?: string;
  rounded?: boolean;
  size?: AppModalSize;
}

export interface AppModalSlots {
  header?: () => VNode[];
  default?: () => VNode[];
  footer?: (props: {
    close: () => void;
  }) => VNode[];
}
