import type { VNode } from 'vue';

export type CommonTitleWeight = 'bold' | 'normal' | 'thin';

export type CommonTitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface CommonTitleProps {
  text?: string;
  comment?: boolean;
  inverted?: boolean;
  bordered?: boolean;
  uppercase?: boolean;
  tag?: CommonTitleTags;
  weight?: CommonTitleWeight;
}

export interface CommonTitleSlots {
  default?: () => VNode[];
}
