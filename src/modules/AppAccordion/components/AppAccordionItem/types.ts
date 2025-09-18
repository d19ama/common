import type { VNode } from 'vue';

export interface AppAccordionItemProps {
  headerText?: string;
  bodyText?: string;
}

export interface AppAccordionItemType {
  name: string;
  active: boolean;
}

export interface AppAccordionItemSlots {
  'icon'?: () => VNode[];
  'body'?: () => VNode[];
  'header'?: () => VNode[];
  'header-text'?: () => VNode[];
}
