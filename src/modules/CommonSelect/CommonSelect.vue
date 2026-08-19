<script lang="ts" setup>
import { ref } from 'vue';
import type {
  CommonSelectOption,
  CommonSelectProps,
  CommonSelectSlots,
} from './types';
import { InputBase } from '@/common/components/InputBase';
import { SelectBase } from '@/common/components/SelectBase';
import { COMMON_GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<CommonSelectProps>(), {
  hint: '',
  label: '',
  errorText: '',
  placeholder: '',
  loading: false,
  multiple: false,
  disabled: false,
  required: false,
  dropdownVisible: true,
  options: () => [],
  size: COMMON_GLOBAL_PROP_SIZE_DEFAULT,
});

defineSlots<CommonSelectSlots>();

const value = defineModel<string | string[]>('value', {
  required: false,
  default: '',
});

const options = defineModel<CommonSelectOption[]>('options', {
  required: false,
  default: () => [],
});

const opened = ref<boolean>(false);
</script>

<template>
  <InputBase
    class="common-select"
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
        v-model:options="options"
        v-model:value="value"
        v-model:opened="opened"
        :size="props.size"
        :loading="props.loading"
        :multiple="props.multiple"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :validation="props.validation"
        :dropdown-visible="props.dropdownVisible"
      >
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

        <template #append-dropdown>
          <slot name="append-dropdown" />
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
