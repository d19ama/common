import type { VNode } from 'vue';
import type { CommonGlobalPropSize } from '@/types';

export type CommonModalSize = CommonGlobalPropSize | 'full-width' | 'full-page';

export interface CommonModalProps {
  title?: string;
  appendTo?: string;
  rounded?: boolean;
  size?: CommonModalSize;
}

export interface CommonModalSlots {
  control?: () => VNode[];
  close?: (props: {
    close: () => void;
  }) => VNode[];
  header?: () => VNode[];
  default?: () => VNode[];
  footer?: (props: {
    close: () => void;
  }) => VNode[];
}
