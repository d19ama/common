<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';
import type {
  AppInputFileEmits,
  AppInputFileProps,
  AppInputFileSlots,
} from './types';
import { componentName } from '@/helpers';
import { InputBase } from '@/common/components/InputBase';

const props = withDefaults(defineProps<AppInputFileProps>(), {
  hint: '',
  label: '',
  errorText: '',
  type: 'base64',
  multiple: false,
  required: false,
  placeholder: '...',
  acceptType: 'image',
  acceptSize: 1048576,
  buttonText: 'Загрузить',
});

const emit = defineEmits<AppInputFileEmits>();

const slots = defineSlots<AppInputFileSlots>();

const ACCEPT_SETTINGS = {
  image: '.jpg, .jpeg, .png, .gif, .svg',
  json: 'application/json',
};

const currentFile = ref<File>();
const error = ref<boolean>(false);

const hasButton = computed<boolean>(() => {
  return !!slots.button! || props.buttonText;
});

const fileName = computed<string>(() => {
  return currentFile.value && currentFile.value.name.length
    ? currentFile.value.name
    : props.placeholder;
});

function onChange(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  const files: FileList | null = element.files;

  validate();

  if (!files) {
    return;
  }

  const [
    uploadedFile,
  ] = files;

  if (!uploadedFile || props.validation?.$invalid) {
    return;
  }

  if (props.type === 'base64') {
    encodeImageFileAsURL(uploadedFile, (encodedFile: string) => {
      emit('update:base64', encodedFile);
    });
  }

  if (props.type === 'file') {
    currentFile.value = uploadedFile;
    emit('update:file', uploadedFile);
  }
}

function encodeImageFileAsURL(file: File, callback: Function): void {
  const reader: FileReader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    callback(event.target?.result);
  };

  reader.readAsDataURL(file);
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}
</script>

<template>
  <InputBase
    class="app-input-file"
    :hint="props.hint"
    :label="props.label"
    :required="props.required"
    :disabled="props.disabled"
    :error-text="props.errorText"
    :validation="props.validation"
    :placeholder="props.placeholder"
  >
    <template #label>
      <slot name="label" />
    </template>

    <template #default>
      <span
        v-if="hasButton"
        class="app-input-file__button"
      >
        <slot name="button">
          {{ props.buttonText }}
        </slot>
      </span>
      <input
        type="file"
        :name="props.name || componentName('app-input-file')"
        :multiple="props.multiple"
        :accept="ACCEPT_SETTINGS[props.acceptType]"
        class="app-input-file__input"
        @change="onChange"
      >
      <span class="app-input-file__placeholder">
        <slot
          name="file"
          :file="currentFile"
        >
          {{ fileName }}
        </slot>
      </span>
    </template>

    <template #error>
      <slot name="error" />
    </template>

    <template #hint>
      <slot name="hint" />
    </template>
  </InputBase>
</template>

<style lang="scss">
.app-input-file {
  $padding: 1rem;

  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: .25rem;

  &__input {
    display: none;
  }

  &__button,
  &__placeholder {
    padding: $padding;
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    white-space: nowrap;
    cursor: pointer;
  }

  &__button {
    color: var(--color-gray-dark);
    border-radius: .5rem 0 0 .5rem;
    background-color: var(--color-gray-middle);
  }

  &__placeholder {
    display: block;
    width: 100%;
    opacity: .5;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-gray-dark);
  }
}
</style>
