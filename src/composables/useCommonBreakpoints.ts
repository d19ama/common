import {
  type ComputedRef,
  computed,
} from 'vue';
import { useWindowSize } from '@vueuse/core';
import type { GlobalPropSize } from '@/types';
import { BREAKPOINTS } from '@/constants';
import { BREAKPOINT_KEYS } from '@/constants/breakpoints';

interface UseBreakpointsReturn {
  isXs: ComputedRef<boolean>;
  isSm: ComputedRef<boolean>;
  isMd: ComputedRef<boolean>;
  isLg: ComputedRef<boolean>;
  isXl: ComputedRef<boolean>;
  currentBreakpoint: ComputedRef<GlobalPropSize>;
}

export function useCommonBreakpoints(): UseBreakpointsReturn {
  const {
    width,
  } = useWindowSize();

  const currentBreakpoint = computed<GlobalPropSize>(() => {
    if (width.value <= BREAKPOINTS.xs) {
      return BREAKPOINT_KEYS.xs;
    }

    if (width.value <= BREAKPOINTS.sm) {
      return BREAKPOINT_KEYS.sm;
    }

    if (width.value <= BREAKPOINTS.md) {
      return BREAKPOINT_KEYS.md;
    }

    if (width.value <= BREAKPOINTS.lg) {
      return BREAKPOINT_KEYS.lg;
    }

    return BREAKPOINT_KEYS.xl;
  });

  const isXs = computed<boolean>(() => {
    return currentBreakpoint.value === BREAKPOINT_KEYS.xs;
  });

  const isSm = computed<boolean>(() => {
    return currentBreakpoint.value === BREAKPOINT_KEYS.sm;
  });

  const isMd = computed<boolean>(() => {
    return currentBreakpoint.value === BREAKPOINT_KEYS.md;
  });

  const isLg = computed<boolean>(() => {
    return currentBreakpoint.value === BREAKPOINT_KEYS.lg;
  });

  const isXl = computed<boolean>(() => {
    return currentBreakpoint.value === BREAKPOINT_KEYS.xl;
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
