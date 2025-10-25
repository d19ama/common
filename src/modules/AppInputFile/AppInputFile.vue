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
import type { HTMLElementClass } from '@/types';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

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
  size: GLOBAL_PROP_SIZE_DEFAULT,
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

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-input-file--size-${props.size}`,
  ];
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
    :size="props.size"
    :label="props.label"
    :class="elementClass"
    :required="props.required"
    :disabled="props.disabled"
    :error-text="props.errorText"
    :validation="props.validation"
    :placeholder="props.placeholder"
    @click="onClick"
  >
    <template
      v-if="$slots.label"
      #label
    >
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
        class="app-input-file__field"
        :name="name"
        :multiple="props.multiple"
        :accept="ACCEPT_SETTINGS[props.acceptType]"
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
// RESET
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

// COMPONENT STYLES
.app-input-file {
  $parent: &;

  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: .25rem;

  &__field {
    width: 0;
    overflow: hidden;
  }

  &__button,
  &__placeholder {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
  }

  &__button {
    color: var(--common-input-base-button-color);
    border-radius: var(--common-input-base-wrapper-border-radius) 0 0 var(--common-input-base-wrapper-border-radius);
    background-color: var(--common-input-base-button-bg);
  }

  &__placeholder {
    display: block;
    width: 100%;
    opacity: .5;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--common-color-main);
  }

  // SIZES
  &--size-xs {
    gap: .125rem;

    #{$parent}__button,
    #{$parent}__placeholder {
      height: 2rem;
      padding: 0 .75rem;
      font-size: .625rem;
      line-height: 2rem;
    }
  }

  &--size-sm {
    gap: .125rem;

    #{$parent}__button,
    #{$parent}__placeholder {
      height: 2.5rem;
      padding: 0 .875rem;
      font-size: .75rem;
      line-height: 2.5rem;
    }
  }

  &--size-md {
    #{$parent}__button,
    #{$parent}__placeholder {
      height: 3rem;
      padding: 0 1rem;
      font-size: .875rem;
      line-height: 3rem;
    }
  }

  &--size-lg {
    #{$parent}__button,
    #{$parent}__placeholder {
      height: 3.5rem;
      padding: 0 1.125rem;
      font-size: 1rem;
      line-height: 3.5rem;
    }
  }

  &--size-xl {
    #{$parent}__button,
    #{$parent}__placeholder {
      height: 4rem;
      padding: 0 1.25rem;
      font-size: 1.125rem;
      line-height: 4rem;
    }
  }
}
</style>
