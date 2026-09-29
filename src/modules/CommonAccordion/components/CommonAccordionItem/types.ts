import type { VNode } from 'vue';

export type CommonAccordionItemType = {
  name: string;
  active: boolean;
};

export type CommonAccordionItemProps = Pick<CommonAccordionItemType, 'name'>
  & Partial<Pick<CommonAccordionItemType, 'active'>>
  & {
    headerText?: string;
    bodyText?: string;
  };

export type CommonAccordionItemSlots = {
  'header'?: () => VNode[];
  'header-text'?: () => VNode[];
  'icon'?: () => VNode[];
  'body'?: () => VNode[];
  'content'?: () => VNode[];
};
