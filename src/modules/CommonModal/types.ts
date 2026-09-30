import type { CommonGlobalPropSize } from '@/types';

export type CommonModalSize = CommonGlobalPropSize | 'full-width' | 'full-container' | 'full-page';

export type CommonModalProps = {
  title?: string;
  appendTo?: string;
  rounded?: boolean;
  size?: CommonModalSize;
  close?: () => void;
  important?: boolean;
};

export type CommonModalSlots = {
  'control'?: [];
  'close'?: [props: {
    close: () => void;
  }];
  'header'?: [];
  'default'?: [];
  'footer'?: [props: {
    close: () => void;
  }];
  'close-icon': [];
  'container': [];
};
