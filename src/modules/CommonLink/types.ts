import type { VNode } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { CommonGlobalPropTheme } from '@/types';

export type CommonLinkTheme = CommonGlobalPropTheme;

export type CommonLinkProps = {
  to?: RouteLocationRaw;
  text?: string;
  prevent?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  theme?: CommonLinkTheme;
};

export type CommonLinkSlots = {
  default?: () => VNode[];
};
