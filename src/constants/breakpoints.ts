import type { GlobalPropSize } from '@/types';

export const BREAKPOINT_KEYS: Record<GlobalPropSize, GlobalPropSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

export const BREAKPOINTS: Record<GlobalPropSize, number> = {
  xs: 320,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
};
