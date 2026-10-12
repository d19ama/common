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
  'header'?: [];
  'header-text'?: [text: string];
  'icon'?: [active: boolean];
  'body'?: [];
  'body-text'?: [text: string];
};
