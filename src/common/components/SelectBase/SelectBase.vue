<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
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
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';
import { Dropdown } from '@/common/components/Dropdown';
import type { DropdownItem } from '@/common/components/Dropdown/types';

const props = withDefaults(defineProps<SelectBaseProps>(), {
  placeholder: '',
  loading: false,
  dropdownVisible: true,
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

const emit = defineEmits<SelectBaseEmits>();

defineSlots<SelectBaseSlots>();

const opened = defineModel('opened', {
  required: false,
  default: false,
});

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const options = defineModel<SelectBaseOption[]>('options', {
  required: false,
  default: () => [],
});

const select = useTemplateRef<HTMLElement>('selectRef');

const selected = ref<SelectBaseOption>();

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !selected.value;
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
    },
  ];
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

function validate(): void {
  props.validation?.$touch();
}

function changeSelected(option: DropdownItem): void {
  selected.value = option;
  value.value = option.text;
  opened.value = false;
  emit('change:selected', option);
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
    :class="elementClass"
    @click="emit('click')"
  >
    <slot>
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
    </slot>
  </div>
  <Dropdown
    v-model:visible="isDropdownVisible"
    v-model:options="options"
    :size="props.size"
    :loading="props.loading"
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

    <template #append>
      <slot name="append-dropdown" />
    </template>
  </Dropdown>
</template>

<style lang="scss">
.select-base {
  $parent: &;

  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &__selected,
  &__placeholder {
    font-weight: 400;
    line-height: 1.5;
    color: var(--common-color-text-main);
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
    padding: .75rem 1.75rem .75rem .75rem;

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: .625rem;
    }
  }

  &--size-sm {
    padding: .875rem 1.875rem .875rem .875rem;

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: .75rem;
    }
  }

  &--size-md {
    padding: 1rem 2rem 1rem 1rem;

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: .875rem;
    }
  }

  &--size-lg {
    padding: 1.125rem 2.125rem 1.125rem 1.125rem;

    #{$parent}__selected,
    #{$parent}__placeholder {
      font-size: 1rem;
    }
  }

  &--size-xl {
    padding: 1.25rem 2.25rem 1.25rem 1.25rem;

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
