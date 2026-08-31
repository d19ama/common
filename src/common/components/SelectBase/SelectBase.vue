<script setup lang="ts" generic="ID extends OptionId">
import {
  computed,
  onMounted,
  onUnmounted,
  useTemplateRef,
  watch,
} from 'vue';
import type {
  SelectBaseEmits,
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { COMMON_GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';
import { Dropdown } from '@/common/components/Dropdown';
import type { DropdownItem } from '@/common/components/Dropdown/types';
import type { OptionId } from '@/common/types/option-id';

const props = withDefaults(defineProps<SelectBaseProps>(), {
  placeholder: '',
  loading: false,
  multiple: false,
  disabled: false,
  dropdownVisible: true,
  size: COMMON_GLOBAL_PROP_SIZE_DEFAULT,
});

const emit = defineEmits<SelectBaseEmits<ID>>();

defineSlots<SelectBaseSlots>();

const opened = defineModel('opened', {
  required: false,
  default: false,
});

const value = defineModel<string | string[]>('value', {
  required: false,
  default: '',
});

const options = defineModel<SelectBaseOption<ID>[]>('options', {
  required: false,
  default: () => [],
});

const root = useTemplateRef<HTMLElement>('rootRef');

const selectedOptions = computed<SelectBaseOption<ID>[]>(() => {
  return options.value.filter((option) => {
    return option.selected;
  });
});

const selectedText = computed<string>(() => {
  return selectedOptions.value
    .map((option) => {
      return option.text;
    })
    .join(', ');
});

const hasSelected = computed<boolean>(() => {
  return selectedOptions.value.length > 0;
});

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !hasSelected.value;
});

const isDropdownVisible = computed<boolean>(() => {
  return opened.value
    && props.dropdownVisible;
});

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `select-base--size-${props.size}`,
    {
      'select-base--opened': opened.value && props.dropdownVisible,
      'select-base--disabled': props.disabled,
    },
  ];
});

function syncValueFromOptions(currentOptions: SelectBaseOption<ID>[]): void {
  const selected = currentOptions.filter((option) => {
    return option.selected;
  });

  if (props.multiple) {
    value.value = selected.map((option) => {
      return String(option.id);
    });
  } else {
    const [
      first,
    ] = selected;

    value.value = first
      ? String(first.id)
      : '';
  }
}

function syncOptionsFromValue(): void {
  const selectedIds = new Set(props.multiple
    ? (Array.isArray(value.value)
        ? value.value
        : [])
    : [
        value.value,
      ].filter(Boolean));

  const hasMismatch = options.value.some((option) => {
    return option.selected !== selectedIds.has(String(option.id));
  });

  if (!hasMismatch) {
    return;
  }

  options.value = options.value.map((option) => {
    return {
      ...option,
      selected: selectedIds.has(String(option.id)),
    };
  });
}

function hideDropdown(event: MouseEvent): void {
  if (!root.value) {
    return;
  }

  const isOutside: boolean = root.value !== event.target
    && !root.value.contains(event.target as Node);

  if (isOutside) {
    opened.value = false;
  }
}

function validate(): void {
  props.validation?.$touch();
}

function onControlClick(): void {
  if (props.disabled) {
    return;
  }

  opened.value = !opened.value;
  emit('click');
}

function onKeydown(event: KeyboardEvent): void {
  if (props.disabled) {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onControlClick();
  } else if (event.key === 'Escape') {
    opened.value = false;
  }
}

function changeSelected(option: DropdownItem<ID>, currentOptions: DropdownItem<ID>[]): void {
  syncValueFromOptions(currentOptions);

  if (!props.multiple) {
    opened.value = false;
  }

  emit(
    'change:selected',
    option,
    currentOptions,
  );
}

onMounted(() => {
  syncOptionsFromValue();

  if (typeof document !== 'undefined') {
    document.addEventListener('click', hideDropdown);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', hideDropdown);
  }
});

watch(opened, (newValue) => {
  if (!newValue) {
    validate();
  }
});

watch(value, syncOptionsFromValue);
</script>

<template>
  <div
    ref="rootRef"
    class="select-base"
    :class="elementClass"
  >
    <div
      class="select-base__control"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isDropdownVisible"
      :aria-disabled="props.disabled"
      :tabindex="props.disabled ? -1 : 0"
      @click="onControlClick"
      @keydown="onKeydown"
    >
      <slot>
        <span
          v-if="isPlaceholderVisible"
          class="select-base__placeholder"
        >
          {{ props.placeholder }}
        </span>
        <span
          v-if="hasSelected"
          class="select-base__selected"
        >
          {{ selectedText }}
        </span>
        <div class="select-base__icon">
          <slot name="icon">
            <span class="select-base__arrow" />
          </slot>
        </div>
      </slot>
    </div>
    <Dropdown
      v-model:visible="isDropdownVisible"
      v-model:options="options"
      :size="props.size"
      :loading="props.loading"
      :multiple="props.multiple"
      @change:selected="changeSelected"
    >
      <template
        v-for="item in options"
        #[`dropdown-item-${String(item.id)}`]
      >
        <slot
          :name="`select-item-${String(item.id)}`"
          :text="item.text"
        />
      </template>

      <template #item-text>
        <slot name="option-text" />
      </template>

      <template #item-icon>
        <slot name="option-icon" />
      </template>

      <template #append>
        <slot name="append-dropdown" />
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.select-base {
  $parent: &;

  display: block;
  width: 100%;
  position: relative;

  &__control {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    overflow: hidden;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  &__selected,
  &__placeholder {
    font-weight: 400;
    line-height: 1.5;
    color: var(--common-color-main);
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

  &__icon {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin: auto;
    position: absolute;
    top: 0;
    right: .75rem;
    bottom: 0;
    z-index: 2;
    pointer-events: none;
  }

  &__arrow {
    display: block;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 5px solid var(--common-select-base-arrow-color);
    border-bottom: 0;
  }

  // SIZES
  &--size-xs {
    #{$parent}__control {
      height: 2rem;
      padding: 0 1.75rem 0 0.75rem;
    }

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: .625rem;
    }
  }

  &--size-sm {
    #{$parent}__control {
      height: 2.5rem;
      padding: 0 1.875rem 0 .875rem;
    }

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: .75rem;
    }
  }

  &--size-md {
    #{$parent}__control {
      height: 3rem;
      padding: 0 2rem 0 1rem;
    }

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: .875rem;
    }
  }

  &--size-lg {
    #{$parent}__control {
      height: 3.5rem;
      padding: 0 2.125rem 0 1.125rem;
    }

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: 1rem;
    }
  }

  &--size-xl {
    #{$parent}__control {
      height: 4rem;
      padding: 0 2.25rem 0 1.25rem;
    }

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: 1.125rem;
    }
  }

  // STATES
  &--opened {

    #{$parent}__arrow {
      transform: rotate(180deg);
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }
}
</style>
