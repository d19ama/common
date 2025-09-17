<script lang="ts" setup>
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
} from 'vue';
import type {
  AppCheckboxProps,
  AppCheckboxSlots,
} from './types';
import { componentName } from '@/helpers';
import type { HTMLElementClass } from '@/types';
import { componentNameByInstance } from '@/helpers/component-name';

const props = withDefaults(defineProps<AppCheckboxProps>(), {
  name: componentName('app-checkbox'),
  disabled: false,
});

defineSlots<AppCheckboxSlots>();

const checked = defineModel<boolean>('checked', {
  required: true,
});

const instance: ComponentInternalInstance | null = getCurrentInstance();

const name = computed<string>(() => {
  return props.name || componentNameByInstance(instance);
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-checkbox--checked': checked.value,
    'app-checkbox--disabled': props.disabled,
  };
});
</script>

<template>
  <div class="app-checkbox__wrapper">
    <label
      :for="name"
      class="app-checkbox"
      :class="elementClass"
    >
      <input
        :id="name"
        v-model="checked"
        :name="name"
        :disabled="props.disabled"
        type="checkbox"
        class="app-checkbox__input"
        autocomplete="off"
      >
      <span class="app-checkbox__box" />
      <span class="app-checkbox__text">
        <slot>
          {{ props.text }}
        </slot>
      </span>
    </label>
  </div>
</template>

<style lang="scss">
// RESET
[type='checkbox'] {
  box-sizing: border-box;
  padding: 0;
}

// COMPONENT STYLES
.app-checkbox {
  $parent: &;

  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  width: 100%;
  user-select: none;
  cursor: pointer;

  &:hover {

    #{$parent}__box {

      &::after {
        opacity: 1;
        background-color: var(--color-form-dark);
      }
    }
  }

  &__input {
    display: none;
  }

  &__box,
  &__text {
    font-size: .875rem;
    font-weight: 400;
    color: var(--color-text-main);
    line-height: 1.5rem;
  }

  &__box {
    display: block;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    position: relative;
    border: 0;

    &::before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: transparent;
      box-shadow: inset 0 0 0 1px var(--color-form-dark);
      transition: box-shadow var(--transition), background-color var(--transition);
    }

    &::after {
      content: '';
      width: 1.125rem;
      height: 1.125rem;
      opacity: 0;
      position: absolute;
      top: 3px;
      left: 3px;
      background-color: transparent;
      transition: background-color var(--transition), opacity var(--transition);
    }
  }

  &--checked {

    #{$parent}__box {

      &::before {
        background-color: transparent;
        box-shadow: inset 0 0 0 1px var(--color-form-dark);
      }

      &::after {
        opacity: 1;
        background-position: center;
        background-repeat: no-repeat;
        background-color: var(--color-form-dark);
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSA1TDUgOUwxMyAxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+);
      }
    }
  }

  &--disabled {
    opacity: .4;
    pointer-events: none;
  }
}
</style>
