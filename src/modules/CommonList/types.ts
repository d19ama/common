export type CommonListTags = 'ul' | 'ol';

export type CommonListItemType = {
  id: string;
  label: string;
};

export type CommonListProps = {
  tag?: CommonListTags;
  marker?: string;
  noMarkers?: boolean;
  items?: CommonListItemType[];
};

export type CommonListSlots = {
  [key: `list-item-${CommonListItemType['id']}`]: [data: CommonListItemType];
};
