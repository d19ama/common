<script lang="ts" setup>
import type {
  AppTabsItem,
  AppTabsSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

defineSlots<AppTabsSlots>();

const items = defineModel<AppTabsItem[]>('items', {
  required: true,
});

function labelClass(item: AppTabsItem): HTMLElementClass {
  return {
    'app-tabs__label--active': item.active,
    'app-tabs__label--disabled': !!item.disabled,
  };
}

function toggleItem(id: AppTabsItem['id']): void {
  items.value = items.value.map((item: AppTabsItem) => {
    return {
      ...item,
      active: item.id === id,
    };
  });
}
</script>

<template>
  <div class="app-tabs">
    <div class="app-tabs__header">
      <div
        v-for="item in items"
        :key="item.id"
        class="app-tabs__label"
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
.app-tabs {
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
    background: var(--app-tabs-header-bg);
  }

  &__label {
    display: block;
    position: relative;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--common-color-text-main);
    text-decoration: none;
    transition: color .3s, opacity .3s;
    border: var(--app-tabs-label-border);
    border-bottom-color: var(--app-tabs-label-border-color-active);
    background: var(--app-tabs-label-bg);
    border-radius: var(--app-tabs-label-border-radius);
    user-select: none;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &--active {
      border-left-color: var(--app-tabs-label-border-color-active);
      border-top-color: var(--app-tabs-label-border-color-active);
      border-right-color: var(--app-tabs-label-border-color-active);
      border-bottom-color: transparent;
      background: var(--app-tabs-label-bg-active);
    }

    &--disabled {
      color: var(--common-color-ui-tertiary);
      pointer-events: none;
    }
  }
}
</style>
