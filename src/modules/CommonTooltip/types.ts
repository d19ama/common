import type { Props } from 'tippy.js';
import type { VNode } from 'vue';

export interface CommonTooltipActions {
  close?: (() => void);
}

export interface CommonTooltipProps {
  title?: string;
  visible?: boolean;
  placement?: Props['placement'];
}

export type CommonTooltipTippyProps = Pick<
  Props,
  'placement'
  | 'offset'
  | 'interactive'
  | 'appendTo'
  | 'trigger'
>;

export interface CommonTooltipSlots {
  activator?: () => VNode[];
  default?: (scope: { close?: Function }) => VNode[];
}
