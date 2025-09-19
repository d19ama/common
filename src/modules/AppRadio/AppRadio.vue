<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';
import type {
  AppRadioEmits,
  AppRadioOption,
  AppRadioProps,
  AppRadioSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppRadioProps>(), {
  theme: 'form',
  required: false,
  disabled: false,
  options: () => [],
});

const emit = defineEmits<AppRadioEmits>();

defineSlots<AppRadioSlots>();

const value = defineModel<string>('value', {
  required: true,
});

const error = ref<boolean>(false);

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-radio--theme-${props.theme}`,
    {
      'app-radio--disabled': props.disabled,
    },
  ];
});

function optionClass(option: AppRadioOption): HTMLElementClass {
  return {
    'app-radio__option--disabled': option.disabled,
  };
}

function onChange(): void {
  validate();
  emit('input', value.value);
}

function onInput(): void {
  validate();
  emit('input', value.value);
}

function validate(): void {
  error.value = props.required && !value.value;
}
</script>

<template>
  <div
    class="app-radio"
    :class="elementClass"
  >
    <div
      v-for="item in props.options"
      :key="item.id"
      class="app-radio__option"
      :class="optionClass(item)"
    >
      <input
        :id="item.id"
        v-model="value"
        :name="props.name"
        :value="item.id"
        type="radio"
        class="app-radio__input"
        :checked="item.checked"
        :disabled="item.disabled"
        autocomplete="off"
        @input="onInput"
        @change="onChange"
      >
      <label
        class="app-radio__label"
        :for="item.id"
      >
        <span class="app-radio__text">
          <slot
            :name="`radio-${String(item.id)}`"
            :text="item.text"
          >
            {{ item.text }}
          </slot>
        </span>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
// RESET
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}

// COMPONENT STYLES
.app-radio {
  $parent: &;

  &__option {
    position: relative;
    user-select: none;

    &+& {
      margin-top: .5rem;
    }
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__text {
    font-weight: 400;
    color: var(--common-color-text-main);
    font-size: .875rem;
    line-height: 1.5rem;
  }

  &__label {
    display: flex;
    height: 1.5rem;
    font-size: 1rem;
    padding-left: 39px;
    position: relative;
    color: var(--common-color-text-main);
    line-height: 1.5rem;
    transition: color var(--common-transition);
    cursor: pointer;

    &:before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 100%;
      transition: border-color var(--common-transition), background-color var(--common-transition), opacity var(--common-transition);
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  // THEMES
  &--theme-form {

    #{$parent}__label {

      &:before {
        border: 1px solid var(--common-color-ui-primary);
        background-color: var(--common-color-white);
      }

      &:hover {

        &::before {
          border-color: var(--common-color-ui-primary);
          background-color: var(--common-color-ui-primary);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {

        &:before {
          border-color: var(--common-color-ui-primary);
          background-color: var(--common-color-ui-primary);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__input:checked + #{$parent}__label {

      &::before {
        border-color: var(--common-color-ui-primary);
        background-color: var(--common-color-ui-primary);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-primary {

    #{$parent}__label {

      &:before {
        border: 1px solid var(--common-color-primary-light);
        background-color: var(--common-color-white);
      }

      &:hover {

        &::before {
          border-color: var(--common-color-primary-light);
          background-color: var(--common-color-primary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {

        &:before {
          border-color: var(--common-color-primary-light);
          background-color: var(--common-color-primary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__input:checked + #{$parent}__label {

      &::before {
        border-color: var(--common-color-primary-light);
        background-color: var(--common-color-primary-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-secondary {

    #{$parent}__label {

      &:before {
        border: 1px solid var(--common-color-secondary-light);
        background-color: var(--common-color-white);
      }

      &:hover {

        &::before {
          border-color: var(--common-color-secondary-light);
          background-color: var(--common-color-secondary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {

        &:before {
          border-color: var(--common-color-secondary-light);
          background-color: var(--common-color-secondary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__input:checked + #{$parent}__label {

      &::before {
        border-color: var(--common-color-secondary-light);
        background-color: var(--common-color-secondary-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-tertiary {

    #{$parent}__label {

      &:before {
        border: 1px solid var(--common-color-tertiary-light);
        background-color: var(--common-color-white);
      }

      &:hover {

        &::before {
          border-color: var(--common-color-tertiary-light);
          background-color: var(--common-color-tertiary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {

        &:before {
          border-color: var(--common-color-tertiary-light);
          background-color: var(--common-color-tertiary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__input:checked + #{$parent}__label {

      &::before {
        border-color: var(--common-color-tertiary-light);
        background-color: var(--common-color-tertiary-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-unaccented {

    #{$parent}__label {

      &:before {
        border: 1px solid var(--common-color-unaccented-light);
        background-color: var(--common-color-white);
      }

      &:hover {

        &::before {
          border-color: var(--common-color-unaccented-light);
          background-color: var(--common-color-unaccented-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {

        &:before {
          border-color: var(--common-color-unaccented-light);
          background-color: var(--common-color-unaccented-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__input:checked + #{$parent}__label {

      &::before {
        border-color: var(--common-color-unaccented-light);
        background-color: var(--common-color-unaccented-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }
}
</style>
