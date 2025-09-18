<script lang="ts" setup>
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type {
  AppComboboxEmits,
  AppComboboxOption,
  AppComboboxProps,
  AppComboboxSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { AppSpinner } from '@/modules';
import {
  DEFAULT_DELAY,
  DEFAULT_SEARCH_LENGTH,
} from '@/common/constants';
import { InputBase } from '@/common/components/InputBase';
import { componentNameByInstance } from '@/helpers/component-name';

const props = withDefaults(defineProps<AppComboboxProps>(), {
  hint: '',
  label: '',
  errorText: '',
  loading: false,
  placeholder: '',
  multiple: false,
  disabled: false,
  required: false,
  searchError: false,
});

const emit = defineEmits<AppComboboxEmits>();

defineSlots<AppComboboxSlots>();

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const options = defineModel<AppComboboxOption[]>('options', {
  required: false,
  default: () => [],
});

const search = defineModel<string>('search', {
  required: false,
  default: '',
});

const error = ref<boolean>(false);
const opened = ref<boolean>(false);
const focused = ref<boolean>(false);
const localSearch = ref<string>('');
const rootRef = useTemplateRef<HTMLElement>('rootRef');

const instance: ComponentInternalInstance | null = getCurrentInstance();

const name = computed<string>(() => {
  return props.name || componentNameByInstance(instance);
});

const isDropdownVisible = computed<boolean>(() => {
  return opened.value
    && search.value.length > DEFAULT_SEARCH_LENGTH;
});

const hasOptions = computed<boolean>(() => {
  return !props.loading && options.value.length > 0;
});

const updateSearch = useDebounceFn((value) => {
  search.value = value;
}, DEFAULT_DELAY);

function hideDropdown(event: MouseEvent): void {
  if (!rootRef.value) {
    return;
  }

  const isOutside: boolean = rootRef.value !== event.target
    && !rootRef.value.contains(event.target as Node);

  if (isOutside) {
    opened.value = false;
  }
}

function changeSelected(option: AppComboboxOption): void {
  options.value = options.value.map((item) => {
    return {
      ...item,
      selected: item.id === option.id,
    };
  });

  opened.value = false;
  value.value = option.text;
  localSearch.value = option.text;
}

function onFocus(): void {
  focused.value = true;
  emit('focus');
}

function onBlur(): void {
  focused.value = false;
  emit('blur');
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}

function optionClass(item: AppComboboxOption): HTMLElementClass {
  return {
    'app-combobox__option--selected': item.selected,
    'app-combobox__option--disabled': item.disabled,
  };
}

onMounted(() => {
  document.addEventListener('click', hideDropdown);
});

watch(localSearch, (value) => {
  const searchable = value.length > DEFAULT_SEARCH_LENGTH;

  opened.value = searchable;

  if (searchable) {
    updateSearch(value);
  }
});

watch(focused, (value) => {
  if (!value) {
    validate();
  }
});
</script>

<template>
  <InputBase
    class="app-combobox"
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
        ref="rootRef"
        class="app-combobox__container"
      >
        <input
          v-model="localSearch"
          :name="name"
          :maxlength="props.maxLength"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          autocomplete="off"
          class="app-combobox__input"
          type="text"
          @focus="onFocus"
          @blur="onBlur"
        >
        <div
          v-if="isDropdownVisible"
          class="app-combobox__dropdown"
        >
          <ul
            v-if="hasOptions"
            class="app-combobox__options"
          >
            <li
              v-for="item in options"
              :key="item.id"
              class="app-combobox__option"
              :class="optionClass(item)"
              @click="changeSelected(item)"
            >
              <slot
                :name="`combobox-${String(item.id)}`"
                :text="item.text"
              >
                {{ item.text }}
              </slot>
            </li>
          </ul>
          <AppSpinner
            v-else-if="props.loading"
            :active="props.loading"
            class="app-combobox__loading"
            auto-width
          />
          <div
            v-else-if="props.searchError"
            class="app-combobox__empty"
          >
            Не удалось загрузить данные.<br>Проверьте подключение к интернету и попробуйте еще раз.
          </div>
        </div>
      </div>
    </template>
  </InputBase>
</template>

<style lang="scss">
.app-combobox {
  $padding: 1rem;
  $parent: &;

  &__container {
    width: 100%;
    height: 3.5rem;
    padding: 1rem;
    position: relative;
    cursor: pointer;
  }

  &__input {
    width: 100%;
    font-weight: 400;
    line-height: 1.5rem;
    font-size: .875rem;
    color: var(--common-color-text-main);
    border: none;
    background-color: transparent;

    &:hover,
    &:focus {
      outline: 0 none;
    }

    &:invalid {
      box-shadow: none;
    }

    &::-ms-clear {
      display: none;
    }
  }

  &__dropdown {
    width: 100%;
    overflow: auto;
    position: absolute;
    top: calc(100% + .25rem);
    left: 0;
    z-index: 10;
    border-radius: .5rem;
    border: var(--common-border);
    background-color: var(--common-color-ui-tertiary);
    transition: opacity var(--common-transition);
  }

  &__options {
    margin: 0;
  }

  &__option,
  &__empty {
    padding: 1rem;
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: var(--common-color-ui-primary);
  }

  &__option {
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
      opacity: .4;
      pointer-events: none;
    }
  }

  &__empty {
    opacity: .4;
  }

  &__loading {
    display: flex;
    align-self: center;
    width: 2rem;
    height: 2rem;
    margin: 1rem auto;
    color: var(--common-color-ui-primary);
  }
}
</style>
