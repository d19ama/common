import type { VNode } from 'vue';

export type AppTitleWeight = 'bold' | 'normal' | 'thin';

export type AppTitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface AppTitleProps {
  text?: string;
  comment?: boolean;
  inverted?: boolean;
  bordered?: boolean;
  uppercase?: boolean;
  tag?: AppTitleTags;
  weight?: AppTitleWeight;
}

export interface AppTitleSlots {
  default?: () => VNode[];
}
