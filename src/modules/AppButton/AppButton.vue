<script setup lang="ts">
import { computed } from 'vue';
import type {
  AppButtonEmits,
  AppButtonProps,
  AppButtonSlots,
  AppButtonTag,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppButtonProps>(), {
  size: 'm',
  tag: 'button',
  type: 'button',
  loading: false,
  disabled: false,
  download: false,
  autoWidth: false,
  theme: 'primary',
  target: '_blank',
  downloadName: 'file',
});

const emit = defineEmits<AppButtonEmits>();

defineSlots<AppButtonSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-button--size-${props.size}`,
    `app-button--theme-${props.theme}`,
    {
      'app-button--loading': props.loading,
      'app-button--disabled': props.disabled,
      'app-button--auto-width': props.autoWidth,
    },
  ];
});

const componentTag = computed<AppButtonTag>(() => {
  if (props.to || props.tag === 'RouterLink') {
    return 'RouterLink';
  }

  if (props.href || props.tag === 'a') {
    return 'a';
  }

  return 'button';
});

const attrs = computed<AppButtonProps>(() => {
  if (props.to || props.tag === 'RouterLink') {
    return {
      to: props.to,
      target: props.target,
    };
  }

  if (props.href || props.tag === 'a') {
    return {
      href: props.href,
      target: props.target,
      download: props.download,
      downloadName: props.downloadName,
    };
  }

  return {
    type: props.type,
    disabled: props.disabled,
  };
});

function onClick(event: Event): void {
  if (props.loading || props.disabled) {
    return;
  }

  emit('click', event);
}
</script>

<template>
  <Component
    :is="componentTag"
    v-bind="attrs"
    class="app-button"
    :class="elementClass"
    @click="onClick"
  >
    <span v-if="!!$slots.prepend">
      <slot name="prepend" />
    </span>

    <slot>
      {{ props.text }}
    </slot>

    <span v-if="!!$slots.append">
      <slot name="append" />
    </span>
  </Component>
</template>

<style lang="scss">
// RESET
button {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  overflow: visible;
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

a {
  background-color: transparent;
}

// COMPONENT STYLES
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0 6px;
  text-align: center;
  text-decoration: none;
  border: 0;
  outline: 0;
  border-radius: var(--common-border-radius);
  transition: background-color var(--common-transition), color var(--common-transition);
  user-select: none;
  cursor: pointer;

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  &--loading {
    pointer-events: none;
  }

  &--auto-width {
    width: auto;
  }

  &--size-s {
    padding: .25rem .5rem;
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &--size-m {
    padding: .5rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &--size-l {
    padding: .75rem 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5;
  }

  // Themes
  &--theme-primary {
    color: var(--common-color-white);
    background-color: var(--common-color-primary);

    &:hover {
      background-color: var(--common-color-primary-hover);
    }
  }

  &--theme-secondary {
    color: var(--common-color-black);
    background-color: var(--common-color-secondary);

    &:hover {
      background-color: var(--common-color-secondary-hover);
    }
  }

  &--theme-tertiary {
    color: var(--common-color-white);
    background-color: var(--common-color-tertiary);

    &:hover {
      background-color: var(--common-color-tertiary-hover);
    }
  }

  &--theme-transparent {
    color: var(--common-color-black);
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
