<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue';
import type {
  AppSelectOption,
  AppSelectProps,
  AppSelectSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { InputBase } from '@/common/components/InputBase';

const props = withDefaults(defineProps<AppSelectProps>(), {
  hint: '',
  label: '',
  errorText: '',
  placeholder: '',
  multiple: false,
  disabled: false,
  required: false,
  options: () => [],
});

defineSlots<AppSelectSlots>();

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const select = useTemplateRef<HTMLElement>('selectRef');

const selected = ref<AppSelectOption>();
const error = ref<boolean>(false);
const opened = ref<boolean>(false);
const localOptions = ref<AppSelectOption[]>(props.options);

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !selected.value;
});

const selectClass = computed<HTMLElementClass>(() => {
  return {
    'app-select--opened': opened.value,
  };
});

const dropdownClass = computed<HTMLElementClass>(() => {
  return {
    'app-select__dropdown--opened': opened.value,
  };
});

onMounted(() => {
  document.addEventListener('click', hideDropdown);
});

function hideDropdown(event: MouseEvent): void {
  if (!select.value) {
    return;
  }

  const isOutside: boolean = select.value !== event.target
    && !select.value.contains(event.target as Node);

  if (isOutside) {
    opened.value = false;
  }
}

function changeSelected(option: AppSelectOption): void {
  localOptions.value = localOptions.value.map((item) => {
    return {
      ...item,
      selected: item.id === option.id,
    };
  });
  selected.value = option;
  value.value = option.text;
  opened.value = false;
}

function toggleDropdown(): void {
  opened.value = !opened.value;
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}

function optionClass(item: AppSelectOption): HTMLElementClass {
  return {
    'app-select__option--selected': item.selected,
    'app-select__option--disabled': item.disabled,
  };
}

watch(() => props.options, (value) => {
  localOptions.value = value;
});

watch(opened, (value) => {
  if (!value) {
    validate();
  }
});
</script>

<template>
  <InputBase
    class="app-select"
    :class="selectClass"
    :hint="props.hint"
    :label="props.label"
    :required="props.required"
    :disabled="props.disabled"
    :error-text="props.errorText"
    :validation="props.validation"
    :placeholder="props.placeholder"
  >
    <template #default>
      <div
        ref="selectRef"
        class="app-select__container"
        @click.self="toggleDropdown"
      >
        <span
          v-if="isPlaceholderVisible"
          class="app-select__placeholder"
        >
          {{ props.placeholder }}
        </span>
        <span
          v-if="selected"
          class="app-select__selected"
        >
          {{ selected.text }}
        </span>
        <span class="app-select__arrow" />
      </div>
      <div
        class="app-select__dropdown"
        :class="dropdownClass"
      >
        <ul class="app-select__options">
          <li
            v-for="item in localOptions"
            :key="item.id"
            class="app-select__option"
            :class="optionClass(item)"
            @click="changeSelected(item)"
          >
            <slot
              :name="`select-item-${String(item.id)}`"
              :text="item.text"
            >
              {{ item.text }}
            </slot>
          </li>
        </ul>
      </div>
    </template>
  </InputBase>
</template>

<style lang="scss">
.app-select {
  $padding: 1rem;
  $parent: &;

  &--opened {

    #{$parent}__arrow {
      transform: rotate(180deg);
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  &__container {
    width: 100%;
    overflow: hidden;
    padding: 1rem 2rem 1rem 1rem;
    position: relative;
    cursor: pointer;
  }

  &__selected,
  &__placeholder {
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--common-color-ui-primary);
  }

  &__selected {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__placeholder {
    display: block;
    opacity: .5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__clear {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 42px;
    z-index: 2;
    border-radius: 50%;
    background-color: var(--common-color-white);
    box-shadow: inset 0 0 0 1px var(--common-color-ui-primary);
    transform: translateY(-50%);
    transition: background-color var(--common-transition), box-shadow var(--common-transition);

    &:before,
    &:after {
      content: '';
      display: block;
      width: .75rem;
      height: .125rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--common-color-ui-primary);
      margin: auto;
      transition: background-color var(--common-transition);
      z-index: 1;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }

    &:hover {
      background-color: var(--common-color-ui-tertiary);
      box-shadow: none;

      &:before,
      &:after {
        background-color: var(--common-color-ui-primary);
      }
    }
  }

  &__arrow {
    display: block;
    width: 0;
    height: 0;
    margin: auto;
    position: absolute;
    top: 0;
    right: .75rem;
    bottom: 0;
    z-index: 2;
    border: 4px solid transparent;
    border-top: 8px solid var(--common-color-ui-primary);
    border-bottom: 0;
    pointer-events: none;
  }

  &__dropdown {
    display: none;
    width: calc(100% + 2px);
    overflow: auto;
    position: absolute;
    top: calc(100% + .5rem);
    left: -1px;
    z-index: 10;
    border: var(--common-border);
    border-radius: var(--common-border-radius);
    background-color: var(--common-color-ui-tertiary);
    transition: opacity var(--common-transition);

    &--opened {
      display: block;
    }
  }

  &__options {
    margin: 0;
  }

  &__option {
    padding: 1rem;
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: var(--common-color-ui-primary);
    transition: background-color var(--common-transition);
    cursor: pointer;

    &:hover {
      background-color: var(--common-color-ui-secondary);
    }

    &--selected {
      position: relative;

      &::before {
        content: '\ea10';
        position: absolute;
        top: 50%;
        right: .5rem;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.5rem;
        color: var(--common-color-ui-primary);
        font-family: 'icon-font', sans-serif;
      }
    }

    &--disabled {
      opacity: .5;
      pointer-events: none;
    }
  }
}
</style>
