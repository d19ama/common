import type { VNode } from 'vue';

export interface CommonAccordionItemProps {
  headerText?: string;
  bodyText?: string;
}

export interface CommonAccordionItemType {
  name: string;
  active: boolean;
}

export interface CommonAccordionItemSlots {
  'icon'?: () => VNode[];
  'body'?: () => VNode[];
  'header'?: () => VNode[];
  'header-text'?: () => VNode[];
}
