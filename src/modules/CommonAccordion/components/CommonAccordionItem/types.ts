import type { VNode } from 'vue';

export type CommonAccordionItemProps = {
  headerText?: string;
  bodyText?: string;
};

export type CommonAccordionItemType = {
  name: string;
  active: boolean;
};

export type CommonAccordionItemSlots = {
  'icon'?: () => VNode[];
  'body'?: () => VNode[];
  'header'?: () => VNode[];
  'header-text'?: () => VNode[];
};
