import type { VNode } from 'vue';

export type CommonTableHeaderWidth = `${string}${'px' | '%'}`;

export interface CommonTableHeader<T> {
  id: string;
  name: keyof T;
  label: string;
  width?: CommonTableHeaderWidth;
}

export interface CommonTableRow<T> {
  id: string;
  data: T;
}

export interface CommonTableProps<T> {
  headers: CommonTableHeader<T>[];
  rows: CommonTableRow<T>[];
  hideHeader?: boolean;
}

export interface CommonTableSlots<T> {
  [key: `th-${string}`]: (scope: {
    data: CommonTableHeader<T>;
  }) => VNode[];
  [key: `td-${string}`]: (scope: {
    data: T;
  }) => VNode[];
}
