<script lang="ts" setup>
import {
  ref,
  watch,
} from 'vue';
import type {
  AppSelectOption,
  AppSelectProps,
  AppSelectSlots,
} from './types';
import { InputBase } from '@/common/components/InputBase';
import { SelectBase } from '@/common/components/SelectBase';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<AppSelectProps>(), {
  hint: '',
  label: '',
  errorText: '',
  placeholder: '',
  multiple: false,
  disabled: false,
  required: false,
  options: () => [],
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

defineSlots<AppSelectSlots>();

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const opened = ref<boolean>(false);
const localOptions = ref<AppSelectOption[]>(props.options);

function toggleDropdown(): void {
  opened.value = !opened.value;
}

watch(() => props.options, (value) => {
  localOptions.value = value;
});
</script>

<template>
  <InputBase
    class="app-select"
    :hint="props.hint"
    :size="props.size"
    :label="props.label"
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
        v-model:options="localOptions"
        v-model:value="value"
        v-model:opened="opened"
        :size="props.size"
        :placeholder="props.placeholder"
        :validation="props.validation"
        @click="toggleDropdown"
      >
        <template #icon>
          <slot name="icon" />
        </template>

        <template
          v-for="item in localOptions"
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
