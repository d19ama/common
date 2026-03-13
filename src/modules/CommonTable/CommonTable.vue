<script setup lang="ts" generic="T extends object">
import {
  type StyleValue,
  computed,
} from 'vue';
import type {
  CommonTableHeader,
  CommonTableProps,
  CommonTableSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<CommonTableProps<T>>(), {
  rows: () => [],
  headers: () => [],
  hideHeader: false,
});

defineSlots<CommonTableSlots<T>>();

const elementClass = computed<HTMLElementClass>(() => {
  return {};
});

function cellWidth(cell: CommonTableHeader<T>): StyleValue {
  return cell.width
    ? {
        width: `${cell.width}`,
      }
    : {};
}
</script>

<template>
  <div
    class="common-table"
    :class="elementClass"
  >
    <table class="common-table__content">
      <thead
        v-if="!props.hideHeader"
        class="common-table__thead"
      >
        <tr class="common-table__tr">
          <th
            v-for="cell in props.headers"
            :key="cell.id"
            :style="cellWidth(cell)"
            class="common-table__th"
          >
            <slot
              :name="`th-${String(cell.name)}`"
              :data="cell"
            >
              {{ cell.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody class="common-table__tbody">
        <tr
          v-for="row in props.rows"
          :key="row.id"
          class="common-table__tr"
        >
          <td
            v-for="cell in props.headers"
            :key="cell.id"
            class="common-table__td"
            :style="cellWidth(cell)"
          >
            <slot
              :name="`td-${String(cell.name)}`"
              :data="row.data"
            >
              {{ row.data[cell.name] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.common-table {
  $parent: &;

  border: 1px solid var(--common-color-ui-primary);

  &__content {
    width: 100%;
    border-collapse: collapse;
  }

  &__thead {
    border-bottom: 1px solid var(--common-color-ui-primary);
  }

  &__th,
  &__td {
    padding: .5rem;
  }

  &__th {
    text-align: left;
  }

  &__td {
    vertical-align: top;
  }
}
</style>
