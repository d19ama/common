import type { VNode } from 'vue';
import type { GlobalPropTheme } from '@/types';

export type AppCheckboxTheme = GlobalPropTheme | 'form';

export interface AppCheckboxProps {
  name?: string;
  text?: string;
  disabled?: boolean;
  theme?: AppCheckboxTheme;
}

export interface AppCheckboxSlots {
  default?: () => VNode[];
}
