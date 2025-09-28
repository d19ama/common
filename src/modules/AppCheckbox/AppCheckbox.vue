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
import type { HTMLElementClass } from '@/types';
import { componentNameByInstance } from '@/helpers/component-name';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<AppCheckboxProps>(), {
  theme: 'form',
  disabled: false,
  required: false,
  size: GLOBAL_PROP_SIZE_DEFAULT,
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
  return [
    `app-checkbox--size-${props.size}`,
    `app-checkbox--theme-${props.theme}`,
    {
      'app-checkbox--checked': checked.value,
      'app-checkbox--disabled': props.disabled,
      'app-checkbox--required': props.required,
    },
  ];
});
</script>

<template>
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
      class="app-checkbox__field"
      autocomplete="off"
    >
    <span class="app-checkbox__box" />
    <span class="app-checkbox__text">
      <slot>
        {{ props.text }}
      </slot>
      <sup
        v-if="props.required"
        class="app-checkbox__text-required"
      >*</sup>
    </span>
  </label>
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

  &__field {
    display: none;
  }

  &__box,
  &__text {
    font-weight: 400;
    line-height: 1.5;
    color: var(--common-color-text-main);
  }

  &__text {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: .125rem;
  }

  &__text-required {
    color: var(--common-input-base-label-required-color);
  }

  &__box {
    display: block;
    flex-shrink: 0;
    position: relative;
    border: 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transition: box-shadow var(--common-transition), background-color var(--common-transition);
    }

    &::after {
      content: '';
      opacity: 0;
      position: absolute;
      top: 3px;
      left: 3px;
      transition: background-color var(--common-transition), opacity var(--common-transition);
    }
  }

  // SIZES
  &--size-xs {
    gap: .75rem;

    #{$parent}__box,
    #{$parent}__text {
      font-size: .625rem;
    }

    #{$parent}__box {
      width: 1.25rem;
      height: 1.25rem;

      &:before {
        width: 1.25rem;
        height: 1.25rem;
      }

      &:after {
        width: .875rem;
        height: .875rem;
      }
    }
  }

  &--size-sm {
    gap: .875rem;

    #{$parent}__box,
    #{$parent}__text {
      font-size: .75rem;
    }

    #{$parent}__box {
      width: 1.375rem;
      height: 1.375rem;

      &:before {
        width: 1.375rem;
        height: 1.375rem;
      }

      &:after {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  &--size-md {
    gap: 1rem;

    #{$parent}__box,
    #{$parent}__text {
      font-size: .875rem;
    }

    #{$parent}__box {
      width: 1.5rem;
      height: 1.5rem;

      &:before {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:after {
        width: 1.125rem;
        height: 1.125rem;
      }
    }
  }

  &--size-lg {
    gap: 1.125rem;

    #{$parent}__box,
    #{$parent}__text {
      font-size: 1rem;
    }

    #{$parent}__box {
      width: 1.625rem;
      height: 1.625rem;

      &:before {
        width: 1.625rem;
        height: 1.625rem;
      }

      &:after {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  &--size-xl {
    gap: 1.25rem;

    #{$parent}__box,
    #{$parent}__text {
      font-size: 1.125rem;
    }

    #{$parent}__box {
      width: 1.75rem;
      height: 1.75rem;

      &:before {
        width: 1.75rem;
        height: 1.75rem;
      }

      &:after {
        width: 1.375rem;
        height: 1.375rem;
      }
    }
  }

  // THEMES
  &--theme-form {

    &:hover {

      #{$parent}__box {

        &::after {
          background-color: var(--common-color-ui-primary);
        }
      }
    }

    #{$parent}__box {

      &::before {
        background-color: transparent;
        box-shadow: inset 0 0 0 1px var(--common-color-ui-primary);
      }

      &::after {
        background-color: transparent;
      }
    }

    &#{$parent}--checked {

      #{$parent}__box {

        &::before {
          background-color: transparent;
          box-shadow: inset 0 0 0 1px var(--common-color-ui-primary);
        }

        &::after {
          background-color: var(--common-color-ui-primary);
        }
      }
    }
  }

  &--theme-primary {

    &:hover {

      #{$parent}__box {

        &::after {
          background-color: var(--common-color-primary-light);
        }
      }
    }

    #{$parent}__box {

      &::before {
        background-color: transparent;
        box-shadow: inset 0 0 0 1px var(--common-color-primary-light);
      }

      &::after {
        background-color: transparent;
      }
    }

    &#{$parent}--checked {

      #{$parent}__box {

        &::before {
          background-color: transparent;
          box-shadow: inset 0 0 0 1px var(--common-color-primary-light);
        }

        &::after {
          background-color: var(--common-color-primary-light);
        }
      }
    }
  }

  &--theme-secondary {

    &:hover {

      #{$parent}__box {

        &::after {
          background-color: var(--common-color-secondary-light);
        }
      }
    }

    #{$parent}__box {

      &::before {
        background-color: transparent;
        box-shadow: inset 0 0 0 1px var(--common-color-secondary-light);
      }

      &::after {
        background-color: transparent;
      }
    }

    &#{$parent}--checked {

      #{$parent}__box {

        &::before {
          background-color: transparent;
          box-shadow: inset 0 0 0 1px var(--common-color-secondary-light);
        }

        &::after {
          background-color: var(--common-color-secondary-light);
        }
      }
    }
  }

  &--theme-tertiary {

    &:hover {

      #{$parent}__box {

        &::after {
          background-color: var(--common-color-tertiary-light);
        }
      }
    }

    #{$parent}__box {

      &::before {
        background-color: transparent;
        box-shadow: inset 0 0 0 1px var(--common-color-tertiary-light);
      }

      &::after {
        background-color: transparent;
      }
    }

    &#{$parent}--checked {

      #{$parent}__box {

        &::before {
          background-color: transparent;
          box-shadow: inset 0 0 0 1px var(--common-color-tertiary-light);
        }

        &::after {
          background-color: var(--common-color-tertiary-light);
        }
      }
    }
  }

  &--theme-unaccented {

    &:hover {

      #{$parent}__box {

        &::after {
          background-color: var(--common-color-unaccented-light);
        }
      }
    }

    #{$parent}__box {

      &::before {
        background-color: transparent;
        box-shadow: inset 0 0 0 1px var(--common-color-unaccented-light);
      }

      &::after {
        background-color: transparent;
      }
    }

    &#{$parent}--checked {

      #{$parent}__box {

        &::before {
          background-color: transparent;
          box-shadow: inset 0 0 0 1px var(--common-color-unaccented-light);
        }

        &::after {
          background-color: var(--common-color-unaccented-light);
        }
      }
    }
  }

  // STATES
  &:hover {

    #{$parent}__box {

      &::after {
        opacity: 1;
      }
    }
  }

  &--checked {

    #{$parent}__box {

      &::after {
        opacity: 1;
        background-position: center;
        background-repeat: no-repeat;
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
