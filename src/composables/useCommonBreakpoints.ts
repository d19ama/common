import {
  type ComputedRef,
  computed,
} from 'vue';
import { useWindowSize } from '@vueuse/core';
import type { CommonGlobalPropSize } from '@/types';
import { COMMON_BREAKPOINTS } from '@/constants';
import { COMMON_BREAKPOINT_KEYS } from '@/constants/breakpoints';

interface UseBreakpointsReturn {
  isXs: ComputedRef<boolean>;
  isSm: ComputedRef<boolean>;
  isMd: ComputedRef<boolean>;
  isLg: ComputedRef<boolean>;
  isXl: ComputedRef<boolean>;
  currentBreakpoint: ComputedRef<CommonGlobalPropSize>;
}

export function useCommonBreakpoints(): UseBreakpointsReturn {
  const {
    width,
  } = useWindowSize();

  const currentBreakpoint = computed<CommonGlobalPropSize>(() => {
    if (width.value <= COMMON_BREAKPOINTS.xs) {
      return COMMON_BREAKPOINT_KEYS.xs;
    }

    if (width.value <= COMMON_BREAKPOINTS.sm) {
      return COMMON_BREAKPOINT_KEYS.sm;
    }

    if (width.value <= COMMON_BREAKPOINTS.md) {
      return COMMON_BREAKPOINT_KEYS.md;
    }

    if (width.value <= COMMON_BREAKPOINTS.lg) {
      return COMMON_BREAKPOINT_KEYS.lg;
    }

    return COMMON_BREAKPOINT_KEYS.xl;
  });

  const isXs = computed<boolean>(() => {
    return currentBreakpoint.value === COMMON_BREAKPOINT_KEYS.xs;
  });

  const isSm = computed<boolean>(() => {
    return currentBreakpoint.value === COMMON_BREAKPOINT_KEYS.sm;
  });

  const isMd = computed<boolean>(() => {
    return currentBreakpoint.value === COMMON_BREAKPOINT_KEYS.md;
  });

  const isLg = computed<boolean>(() => {
    return currentBreakpoint.value === COMMON_BREAKPOINT_KEYS.lg;
  });

  const isXl = computed<boolean>(() => {
    return currentBreakpoint.value === COMMON_BREAKPOINT_KEYS.xl;
  });

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    currentBreakpoint,
  };
}
