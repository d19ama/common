import type { VNode } from 'vue';

export type CommonListTags = 'ul' | 'ol';

export interface CommonListItemType {
  id: string;
  label: string;
}

export interface CommonListProps {
  tag?: CommonListTags;
  noMarkers?: boolean;
  items?: CommonListItemType[];
}

export interface CommonListSlots {
  [key: `list-item-${CommonListItemType['id']}`]: (scope: {
    data: CommonListItemType;
  }) => VNode[];
}
