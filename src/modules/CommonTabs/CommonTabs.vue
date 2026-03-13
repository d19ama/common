<script lang="ts" setup>
import type {
  CommonTabsItem,
  CommonTabsSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

defineSlots<CommonTabsSlots>();

const items = defineModel<CommonTabsItem[]>('items', {
  required: true,
});

function labelClass(item: CommonTabsItem): HTMLElementClass {
  return {
    'common-tabs__label--active': item.active,
    'common-tabs__label--disabled': !!item.disabled,
  };
}

function toggleItem(id: CommonTabsItem['id']): void {
  items.value = items.value.map((item: CommonTabsItem) => {
    return {
      ...item,
      active: item.id === id,
    };
  });
}
</script>

<template>
  <div class="common-tabs">
    <div class="common-tabs__header">
      <div
        v-for="item in items"
        :key="item.id"
        class="common-tabs__label"
        :class="labelClass(item)"
        @click="toggleItem(item.id)"
      >
        <slot
          :name="`tab-${String(item.id)}`"
          :text="item.label"
        >
          {{ item.label }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.common-tabs {
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  z-index: 1;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1 1 100%;
    background: var(--common-tabs-header-bg);
  }

  &__label {
    display: block;
    position: relative;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--common-color-main);
    text-decoration: none;
    transition: color .3s, opacity .3s;
    border: var(--common-tabs-label-border);
    border-bottom-color: var(--common-tabs-label-border-color-active);
    background: var(--common-tabs-label-bg);
    border-radius: var(--common-tabs-label-border-radius);
    user-select: none;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &--active {
      border-left-color: var(--common-tabs-label-border-color-active);
      border-top-color: var(--common-tabs-label-border-color-active);
      border-right-color: var(--common-tabs-label-border-color-active);
      border-bottom-color: transparent;
      background: var(--common-tabs-label-bg-active);
    }

    &--disabled {
      color: var(--common-color-ui-tertiary);
      pointer-events: none;
    }
  }
}
</style>
