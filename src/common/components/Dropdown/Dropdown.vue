<script setup lang="ts">
import { computed } from 'vue';
import type {
  DropdownEmits,
  DropdownItem,
  DropdownProps,
  DropdownSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { COMMON_GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<DropdownProps>(), {
  loading: false,
  multiple: false,
  size: COMMON_GLOBAL_PROP_SIZE_DEFAULT,
});

const emit = defineEmits<DropdownEmits>();

defineSlots<DropdownSlots>();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const options = defineModel<DropdownItem[]>('options', {
  required: false,
  default: () => [],
});

const hasOptions = computed<boolean>(() => {
  return !props.loading && options.value.length > 0;
});

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `dropdown--size-${props.size}`,
  ];
});

function optionClass(item: DropdownItem): HTMLElementClass {
  return {
    'dropdown__item--selected': item.selected,
    'dropdown__item--disabled': item.disabled,
  };
}

function selectOption(option: DropdownItem): void {
  if (option.disabled) {
    return;
  }

  const newOptions: DropdownItem[] = props.multiple
    ? options.value.map((item) => {
      return item.id === option.id
        ? {
            ...item,
            selected: !item.selected,
          }
        : item;
    })
    : options.value.map((item) => {
      return {
        ...item,
        selected: item.id === option.id,
      };
    });

  options.value = newOptions;

  const changed = newOptions.find((item) => {
    return item.id === option.id;
  });

  if (changed) {
    emit(
      'change:selected',
      changed,
      newOptions,
    );
  }
}

function onOptionKeydown(event: KeyboardEvent, option: DropdownItem): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    selectOption(option);
  }
}
</script>

<template>
  <div
    v-if="visible"
    class="dropdown"
    :class="elementClass"
    role="listbox"
    :aria-multiselectable="props.multiple"
  >
    <ul
      v-if="hasOptions"
      class="dropdown__items"
    >
      <li
        v-for="item in options"
        :key="item.id"
        class="dropdown__item"
        :class="optionClass(item)"
        role="option"
        :aria-selected="item.selected"
        :aria-disabled="item.disabled"
        :tabindex="item.disabled ? -1 : 0"
        @click="selectOption(item)"
        @keydown="onOptionKeydown($event, item)"
      >
        <slot
          :name="`dropdown-item-${String(item.id)}`"
          :text="item.text"
        >
          <slot name="item-text">
            {{ item.text }}
          </slot>
          <slot name="item-icon">
            <div class="dropdown__item-icon icon icon-checkmark" />
          </slot>
        </slot>
      </li>
    </ul>
    <slot name="append" />
  </div>
</template>

<style lang="scss">
.dropdown {
  $parent: &;

  display: block;
  width: calc(100% + 2px);
  overflow: auto;
  position: absolute;
  top: calc(100% + .5rem);
  left: -1px;
  z-index: 10;
  border: var(--common-select-base-dropdown-border);
  border-radius: var(--common-select-base-dropdown-border-radius);
  background-color: var(--common-select-base-dropdown-bg);
  transition: opacity var(--common-transition);

  &__items {
    margin: 0;
  }

  &__item {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-between;
    gap: .5rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--common-color-main);
    transition: background-color var(--common-transition);
    cursor: pointer;

    &:hover {
      backdrop-filter: brightness(.95);
    }

    &--selected {
      position: relative;

      #{$parent}__item-icon {
        opacity: 1;
      }
    }

    &--disabled {
      opacity: .5;
      pointer-events: none;
    }
  }

  &__item-icon {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0;
    color: var(--common-select-base-option-icon-color);
  }

  // SIZES
  &--size-xs {
    #{$parent}__item {
      font-size: .625rem;
      padding: .75rem;
    }
  }

  &--size-sm {
    #{$parent}__item {
      font-size: .75rem;
      padding: .875rem;
    }
  }

  &--size-md {
    #{$parent}__item {
      font-size: .875rem;
      padding: 1rem;
    }
  }

  &--size-lg {
    #{$parent}__item {
      font-size: 1rem;
      padding: 1.125rem;
    }
  }

  &--size-xl {
    #{$parent}__item {
      font-size: 1.125rem;
      padding: 1.25rem;
    }
  }
}
</style>
