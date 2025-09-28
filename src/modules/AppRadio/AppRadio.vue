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
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<AppRadioProps>(), {
  theme: 'form',
  required: false,
  disabled: false,
  options: () => [],
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

const emit = defineEmits<AppRadioEmits>();

defineSlots<AppRadioSlots>();

const value = defineModel<string>('value', {
  required: true,
});

const error = ref<boolean>(false);

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-radio--size-${props.size}`,
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
        class="app-radio__field"
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
        <span class="app-radio__box" />
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

  display: flex;
  flex-flow: column nowrap;

  &__option {
    position: relative;
    user-select: none;
  }

  &__field {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__text {
    font-weight: 400;
    line-height: 1.5;
    color: var(--common-color-text-main);
  }

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    color: var(--common-color-text-main);
    transition: color var(--common-transition);
    cursor: pointer;
  }

  &__box {
    border-radius: 100%;
    transition: border-color var(--common-transition), background-color var(--common-transition), opacity var(--common-transition);
  }

  // SIZES
  &--size-xs {
    gap: .25rem;

    #{$parent}__text {
      font-size: .625rem;
    }

    #{$parent}__box {
      width: 1.125rem;
      height: 1.125rem;
    }

    #{$parent}__label {
      gap: .75rem;
    }
  }

  &--size-sm {
    gap: .375rem;

    #{$parent}__text {
      font-size: .75rem;
    }

    #{$parent}__box {
      width: 1.25rem;
      height: 1.25rem;
    }

    #{$parent}__label {
      gap: .875rem;
    }
  }

  &--size-md {
    gap: .5rem;

    #{$parent}__text {
      font-size: .875rem;
    }

    #{$parent}__box {
      width: 1.375rem;
      height: 1.375rem;
    }

    #{$parent}__label {
      gap: 1rem;
    }
  }

  &--size-lg {
    gap: .625rem;

    #{$parent}__text {
      font-size: 1rem;
    }

    #{$parent}__box {
      width: 1.625rem;
      height: 1.625rem;
    }

    #{$parent}__label {
      gap: 1.125rem;
    }
  }

  &--size-xl {
    gap: .75rem;

    #{$parent}__text {
      font-size: 1.125rem;
    }

    #{$parent}__box {
      width: 1.75rem;
      height: 1.75rem;
    }

    #{$parent}__label {
      gap: 1.25rem;
    }
  }

  // THEMES
  &--theme-form {
    #{$parent}__box {
      border: 1px solid var(--common-color-ui-primary);
      background-color: var(--common-color-white);
    }

    #{$parent}__label {
      &:hover {
        #{$parent}__box {
          border-color: var(--common-color-ui-primary);
          background-color: var(--common-color-ui-primary);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {
        #{$parent}__box {
          border-color: var(--common-color-ui-primary);
          background-color: var(--common-color-ui-primary);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__field:checked + #{$parent}__label {
      #{$parent}__box {
        border-color: var(--common-color-ui-primary);
        background-color: var(--common-color-ui-primary);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-primary {
    #{$parent}__box {
      border: 1px solid var(--common-color-primary-light);
      background-color: var(--common-color-white);
    }

    #{$parent}__label {
      &:hover {
        #{$parent}__box {
          border-color: var(--common-color-primary-light);
          background-color: var(--common-color-primary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {
        #{$parent}__box {
          border-color: var(--common-color-primary-light);
          background-color: var(--common-color-primary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__field:checked + #{$parent}__label {
      #{$parent}__box {
        border-color: var(--common-color-primary-light);
        background-color: var(--common-color-primary-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-secondary {
    #{$parent}__box {
      border: 1px solid var(--common-color-secondary-light);
      background-color: var(--common-color-white);
    }

    #{$parent}__label {
      &:hover {
        #{$parent}__box {
          border-color: var(--common-color-secondary-light);
          background-color: var(--common-color-secondary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {
        #{$parent}__box {
          border-color: var(--common-color-secondary-light);
          background-color: var(--common-color-secondary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__field:checked + #{$parent}__label {
      #{$parent}__box {
        border-color: var(--common-color-secondary-light);
        background-color: var(--common-color-secondary-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-tertiary {
    #{$parent}__box {
      border: 1px solid var(--common-color-tertiary-light);
      background-color: var(--common-color-white);
    }

    #{$parent}__label {
      &:hover {
        #{$parent}__box {
          border-color: var(--common-color-tertiary-light);
          background-color: var(--common-color-tertiary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {
        #{$parent}__box {
          border-color: var(--common-color-tertiary-light);
          background-color: var(--common-color-tertiary-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__field:checked + #{$parent}__label {
      #{$parent}__box {
        border-color: var(--common-color-tertiary-light);
        background-color: var(--common-color-tertiary-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  &--theme-unaccented {
    #{$parent}__box {
      border: 1px solid var(--common-color-unaccented-light);
      background-color: var(--common-color-white);
    }

    #{$parent}__label {
      &:hover {
        #{$parent}__box {
          border-color: var(--common-color-unaccented-light);
          background-color: var(--common-color-unaccented-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }

      &:active {
        #{$parent}__box {
          border-color: var(--common-color-unaccented-light);
          background-color: var(--common-color-unaccented-light);
          box-shadow: inset 0 0 0 4px var(--common-color-white);
        }
      }
    }

    #{$parent}__field:checked + #{$parent}__label {
      #{$parent}__box {
        border-color: var(--common-color-unaccented-light);
        background-color: var(--common-color-unaccented-light);
        box-shadow: inset 0 0 0 4px var(--common-color-white);
      }
    }
  }

  // STATES
  &--disabled {
    opacity: .5;
    pointer-events: none;
  }
}
</style>
