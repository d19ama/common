<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue';
import type {
  SelectBaseOption,
  SelectBaseProps,
  SelectBaseSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<SelectBaseProps>(), {
  hint: '',
  label: '',
  errorText: '',
  placeholder: '',
  disabled: false,
  required: false,
});

defineSlots<SelectBaseSlots>();

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const options = defineModel<SelectBaseOption[]>('options', {
  required: false,
  default: () => [],
});

const select = useTemplateRef<HTMLElement>('selectRef');

const opened = ref<boolean>(false);
const selected = ref<SelectBaseOption>();

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !selected.value;
});

const selectClass = computed<HTMLElementClass>(() => {
  return {
    'select-base--opened': opened.value,
  };
});

const dropdownClass = computed<HTMLElementClass>(() => {
  return {
    'select-base__dropdown--opened': opened.value,
  };
});

function optionClass(item: SelectBaseOption): HTMLElementClass {
  return {
    'select-base__option--selected': item.selected,
    'select-base__option--disabled': item.disabled,
  };
}

function toggleDropdown(): void {
  opened.value = !opened.value;
}

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

function changeSelected(option: SelectBaseOption): void {
  options.value = options.value.map((item) => {
    return {
      ...item,
      selected: item.id === option.id,
    };
  });
  selected.value = option;
  value.value = option.text;
  opened.value = false;
}

function validate(): void {
  props.validation?.$touch();
}

onMounted(() => {
  document.addEventListener('click', hideDropdown);
});

watch(opened, (value) => {
  if (!value) {
    validate();
  }
});
</script>

<template>
  <div
    ref="selectRef"
    class="select-base"
    :class="selectClass"
    @click.self="toggleDropdown"
  >
    <span
      v-if="isPlaceholderVisible"
      class="select-base__placeholder"
    >
      {{ props.placeholder }}
    </span>
    <span
      v-if="selected"
      class="select-base__selected"
    >
      {{ selected.text }}
    </span>
    <div class="select-base__icon">
      <slot name="icon">
        <span class="select-base__arrow" />
      </slot>
    </div>
  </div>
  <div
    class="select-base__dropdown"
    :class="dropdownClass"
  >
    <ul class="select-base__options">
      <li
        v-for="item in options"
        :key="item.id"
        class="select-base__option"
        :class="optionClass(item)"
        @click="changeSelected(item)"
      >
        <slot
          :name="`select-item-${String(item.id)}`"
          :text="item.text"
        >
          <slot name="option-text">
            {{ item.text }}
          </slot>
          <slot name="option-icon">
            <div class="select-base__option-icon icon icon-checkmark" />
          </slot>
        </slot>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.select-base {
  $padding: 1rem;
  $parent: &;

  width: 100%;
  overflow: hidden;
  padding: 1rem 2rem 1rem 1rem;
  position: relative;
  cursor: pointer;

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
    border: 4px solid transparent;
    border-top: 8px solid var(--common-color-ui-primary);
    border-bottom: 0;
  }

  &__dropdown {
    display: none;
    width: calc(100% + 2px);
    overflow: auto;
    position: absolute;
    top: calc(100% + .5rem);
    left: -1px;
    z-index: 10;
    border: var(--common-base-input-wrapper-border);
    border-radius: var(--common-base-input-wrapper-border-radius);
    background-color: var(--common-base-input-wrapper-bg);
    transition: opacity var(--common-transition);

    &--opened {
      display: block;
    }
  }

  &__options {
    margin: 0;
  }

  &__option {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-between;
    gap: .5rem;
    padding: 1rem;
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: var(--common-color-ui-primary);
    transition: background-color var(--common-transition);
    cursor: pointer;

    &:hover {
      backdrop-filter: brightness(.95);
    }

    &--selected {
      position: relative;

      #{$parent}__option-icon {
        opacity: 1;
      }
    }

    &--disabled {
      opacity: .5;
      pointer-events: none;
    }
  }

  &__option-icon {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0;
    color: var(--common-color-ui-primary);
  }

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
