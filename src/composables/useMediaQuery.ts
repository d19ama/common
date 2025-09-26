import {
  type ComputedRef,
  computed,
} from 'vue';
import { useWindowSize } from '@vueuse/core';
import type { GlobalPropSize } from '@/types';
import { BREAKPOINTS } from '@/constants';

interface UseMediaQueryReturn {
  currentSize: ComputedRef<GlobalPropSize>;
}

export function useMediaQuery(): UseMediaQueryReturn {
  const {
    width,
  } = useWindowSize();

  const currentSize = computed<GlobalPropSize>(() => {
    if (width.value <= BREAKPOINTS.xs) {
      return 'xs';
    }

    if (width.value <= BREAKPOINTS.sm) {
      return 'sm';
    }

    if (width.value <= BREAKPOINTS.md) {
      return 'md';
    }

    if (width.value <= BREAKPOINTS.lg) {
      return 'lg';
    }

    return 'xl';
  });

  return {
    currentSize,
  };
}
