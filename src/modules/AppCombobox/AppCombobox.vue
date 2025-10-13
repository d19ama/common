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
import { InputBase } from '@/common/components/InputBase';
import { componentNameByInstance } from '@/helpers/component-name';
import { SelectBase } from '@/common/components/SelectBase';
import { AppSpinner } from '@/modules';
import {
  COMMON_DEFAULT_DELAY,
  COMMON_DEFAULT_SEARCH_LENGTH,
  GLOBAL_PROP_SIZE_DEFAULT,
} from '@/constants';
import type { HTMLElementClass } from '@/types';

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
  size: GLOBAL_PROP_SIZE_DEFAULT,
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
    && search.value.length > COMMON_DEFAULT_SEARCH_LENGTH;
});

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-combobox--size-${props.size}`,
  ];
});

const updateSearch = useDebounceFn((value) => {
  search.value = value;
}, COMMON_DEFAULT_DELAY);

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
  const searchable = value.length > COMMON_DEFAULT_SEARCH_LENGTH;

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
    :size="props.size"
    :label="props.label"
    :class="elementClass"
    :required="props.required"
    :disabled="props.disabled"
    :error-text="props.errorText"
    :validation="props.validation"
    :placeholder="props.placeholder"
  >
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>

    <template #default>
      <SelectBase
        v-model:options="options"
        v-model:value="value"
        v-model:opened="opened"
        :size="props.size"
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
            class="app-combobox__field"
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

    <template
      v-if="$slots.error"
      #error
    >
      <slot name="error" />
    </template>

    <template
      v-if="$slots.hint"
      #hint
    >
      <slot name="hint" />
    </template>
  </InputBase>
</template>

<style lang="scss">
.app-combobox {
  $parent: &;

  &__field,
  &__empty {
    font-weight: 400;
    line-height: 1.5rem;
  }

  &__field {
    width: 100%;
    color: var(--common-color-main);
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

    &::placeholder {
      opacity: .5;
      color: var(--common-color-main);
    }
  }

  &__empty {
    opacity: .4;
    color: var(--common-color-main);
  }

  &__loading {
    display: flex;
    align-self: center;
    color: var(--common-color-ui-primary);
  }

  // SIZES
  &--size-xs {
    #{$parent}__field,
    #{$parent}__empty {
      font-size: .625rem;
    }

    #{$parent}__empty {
      padding: .75rem;
    }

    #{$parent}__loading {
      width: 1.75rem;
      height: 1.75rem;
      margin: .75rem auto;
    }
  }

  &--size-sm {
    #{$parent}__field,
    #{$parent}__empty {
      font-size: .75rem;
    }

    #{$parent}__empty {
      padding: .875rem;
    }

    #{$parent}__loading {
      width: 1.875rem;
      height: 1.875rem;
      margin: .875rem auto;
    }
  }

  &--size-md {
    #{$parent}__field,
    #{$parent}__empty {
      font-size: .875rem;
    }

    #{$parent}__empty {
      padding: 1rem;
    }

    #{$parent}__loading {
      width: 2rem;
      height: 2rem;
      margin: 1rem auto;
    }
  }

  &--size-lg {
    #{$parent}__field,
    #{$parent}__empty {
      font-size: 1rem;
    }

    #{$parent}__empty {
      padding: 1.125rem;
    }

    #{$parent}__loading {
      width: 2.125rem;
      height: 2.125rem;
      margin: 1.125rem auto;
    }
  }

  &--size-xl {
    #{$parent}__field,
    #{$parent}__empty {
      font-size: 1.125rem;
    }

    #{$parent}__empty {
      padding: 1.25rem;
    }

    #{$parent}__loading {
      width: 2.25rem;
      height: 2.25rem;
      margin: 1.25rem auto;
    }
  }
}
</style>
