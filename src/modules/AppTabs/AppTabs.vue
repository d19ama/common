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
  }

  &__additional {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 2rem;
    margin-left: auto;
  }

  &__label {
    display: block;
    position: relative;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--color-text-main);
    text-decoration: none;
    transition: color .3s, opacity .3s;
    border: 1px dashed transparent;
    border-bottom-color: var(--color-form-dark);
    user-select: none;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &--active {
      border-left-color: var(--color-form-dark);
      border-top-color: var(--color-form-dark);
      border-right-color: var(--color-form-dark);
      border-bottom-color: transparent;
      background-color: var(--color-white);;
    }

    &--disabled {
      color: var(--color-form-light);
      pointer-events: none;
    }
  }
}
</style>
