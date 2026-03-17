import type { Props } from 'tippy.js';
import type { VNode } from 'vue';

export type CommonTooltipActions = {
  close?: (() => void);
};

export type CommonTooltipProps = {
  title?: string;
  visible?: boolean;
  placement?: Props['placement'];
};

export type CommonTooltipTippyProps = Pick<
  Props,
  'placement'
  | 'offset'
  | 'interactive'
  | 'appendTo'
  | 'trigger'
>;

export type CommonTooltipSlots = {
  activator?: () => VNode[];
  default?: (scope: { close?: Function }) => VNode[];
};
