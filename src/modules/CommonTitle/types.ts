import type { VNode } from 'vue';

export type CommonTitleWeight = 'bold' | 'normal' | 'thin';

export type CommonTitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type CommonTitleProps = {
  text?: string;
  comment?: boolean;
  inverted?: boolean;
  bordered?: boolean;
  uppercase?: boolean;
  tag?: CommonTitleTags;
  weight?: CommonTitleWeight;
};

export type CommonTitleSlots = {
  default?: () => VNode[];
};
