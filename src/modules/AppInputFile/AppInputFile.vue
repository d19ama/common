<script lang="ts" setup>
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  ref,
  useTemplateRef,
} from 'vue';
import type {
  AppInputFileEmits,
  AppInputFileProps,
  AppInputFileSlots,
} from './types';
import { InputBase } from '@/common/components/InputBase';
import { componentNameByInstance } from '@/helpers/component-name';

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

const input = useTemplateRef<HTMLInputElement>('inputRef');

const currentFile = ref<File>();
const error = ref<boolean>(false);

const instance: ComponentInternalInstance | null = getCurrentInstance();

const name = computed<string>(() => {
  return props.name || componentNameByInstance(instance);
});

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

function onClick(): void {
  input.value?.click();
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
    @click="onClick"
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
        ref="inputRef"
        type="file"
        :name="name"
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
// RESET
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

// COMPONENT STYLES
.app-input-file {
  $padding: 1rem;

  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: .25rem;

  &__input {
    width: 0;
    overflow: hidden;
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
    color: var(--common-color-text-main);
    border-radius: var(--common-base-input-wrapper-border-radius) 0 0 var(--common-base-input-wrapper-border-radius);
    backdrop-filter: brightness(0.9);
  }

  &__placeholder {
    display: block;
    width: 100%;
    opacity: .5;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--common-color-text-main);
  }
}
</style>
