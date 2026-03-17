import type { VNode } from 'vue';

export type CommonListTags = 'ul' | 'ol';

export type CommonListItemType = {
  id: string;
  label: string;
};

export type CommonListProps = {
  tag?: CommonListTags;
  noMarkers?: boolean;
  items?: CommonListItemType[];
};

export type CommonListSlots = {
  [key: `list-item-${CommonListItemType['id']}`]: (scope: {
    data: CommonListItemType;
  }) => VNode[];
};
