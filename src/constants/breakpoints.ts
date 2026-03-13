import type { CommonGlobalPropSize } from '@/types';

export const COMMON_BREAKPOINT_KEYS: Record<CommonGlobalPropSize, CommonGlobalPropSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

export const COMMON_BREAKPOINTS: Record<CommonGlobalPropSize, number> = {
  xs: 320,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
};
