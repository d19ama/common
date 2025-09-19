<script lang="ts" setup>
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  ref,
  watch,
} from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type {
  AppComboboxEmits,
  AppComboboxOption,
  AppComboboxProps,
  AppComboboxSlots,
} from './types';
import {
  DEFAULT_DELAY,
  DEFAULT_SEARCH_LENGTH,
} from '@/common/constants';
import { InputBase } from '@/common/components/InputBase';
import { componentNameByInstance } from '@/helpers/component-name';
import { SelectBase } from '@/common/components/SelectBase';
import { AppSpinner } from '@/modules';

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

const opened = ref<boolean>(false);
const focused = ref<boolean>(false);
const localSearch = ref<string>('');

const instance: ComponentInternalInstance | null = getCurrentInstance();

const name = computed<string>(() => {
  return props.name || componentNameByInstance(instance);
});

const isDropdownVisible = computed<boolean>(() => {
  return opened.value
    && search.value.length > DEFAULT_SEARCH_LENGTH;
});

const updateSearch = useDebounceFn((value) => {
  search.value = value;
}, DEFAULT_DELAY);

function onFocus(): void {
  focused.value = true;
  emit('focus');
}

function onBlur(): void {
  focused.value = false;
  emit('blur');
}

function changeSelected(option: AppComboboxOption): void {
  localSearch.value = option.text;
}

watch(localSearch, (value) => {
  const searchable = value.length > DEFAULT_SEARCH_LENGTH;

  opened.value = searchable;

  if (searchable) {
    updateSearch(value);
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
      <SelectBase
        v-model:options="options"
        v-model:value="value"
        v-model:opened="opened"
        :placeholder="props.placeholder"
        :validation="props.validation"
        :dropdown-visible="isDropdownVisible"
        @change:selected="changeSelected"
      >
        <template #default>
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
        </template>

        <template #append-dropdown>
          <AppSpinner
            v-if="props.loading && !options.length"
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
        </template>

        <template #icon>
          <slot name="icon" />
        </template>

        <template
          v-for="item in options"
          #[`select-item-${String(item.id)}`]
        >
          <slot
            :name="`select-item-${String(item.id)}`"
            :text="item.text"
          />
        </template>

        <template #option-text>
          <slot name="option-text" />
        </template>

        <template #option-icon>
          <slot name="option-icon" />
        </template>
      </SelectBase>
    </template>
  </InputBase>
</template>

<style lang="scss">
.app-combobox {
  $padding: 1rem;
  $parent: &;

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

  &__empty {
    opacity: .4;
    padding: 1rem;
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: var(--common-color-ui-primary);
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
