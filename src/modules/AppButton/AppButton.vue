<script setup lang="ts">
import { computed } from 'vue';
import type {
  AppButtonEmits,
  AppButtonProps,
  AppButtonSlots,
  AppButtonTag,
} from './types';
import { AppSpinner } from '@/modules';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppButtonProps>(), {
  size: 'm',
  flat: false,
  tag: 'button',
  type: 'button',
  loading: false,
  disabled: false,
  download: false,
  autoWidth: false,
  theme: 'primary',
  target: '_blank',
  textStyle: 'theme',
  downloadName: 'file',
});

const emit = defineEmits<AppButtonEmits>();

defineSlots<AppButtonSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-button--size-${props.size}`,
    `app-button--theme-${props.theme}`,
    `app-button--text-style-${props.textStyle}`,
    {
      'app-button--flat': props.flat,
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
    <AppSpinner
      v-if="props.loading"
      class="app-button__spinner"
      size="s"
    />
    <template v-else>
      <span v-if="!!$slots.prepend">
        <slot name="prepend" />
      </span>

      <slot>
        {{ props.text }}
      </slot>

      <span v-if="!!$slots.append">
        <slot name="append" />
      </span>
    </template>
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
  $parent: &;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0 6px;
  text-align: center;
  text-decoration: none;
  border: 0;
  outline: 0;
  border-radius: var(--app-button-border-radius);
  transition: filter var(--common-transition), color var(--common-transition), background-color var(--common-transition);
  user-select: none;
  cursor: pointer;

  &__spinner {
    filter: brightness(.8);
  }

  &--size-xs {
    height: 1.375rem;
    padding: 0.125rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &--size-s {
    height: 1.625rem;
    padding: .25rem .5rem;
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &--size-m {
    height: 2.5rem;
    padding: .5rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &--size-l {
    height: 3.375rem;
    padding: .75rem 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &--size-xl {
    height: 4.25rem;
    padding: 1rem 1.25rem;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
  }

  &:hover {
    filter: saturate(1.3);
  }

  // THEMES
  &--theme-primary {
    color: var(--common-color-primary-dark);
    background-color: var(--common-color-primary-light);
  }

  &--theme-secondary {
    color: var(--common-color-secondary-dark);
    background-color: var(--common-color-secondary-light);
  }

  &--theme-tertiary {
    color: var(--common-color-tertiary-dark);
    background-color: var(--common-color-tertiary-light);
  }

  &--theme-unaccented {
    color: var(--common-color-text-main);
    background-color: var(--common-color-unaccented-medium);

    &:hover {
      background-color: var(--common-color-unaccented-dark);
    }
  }

  &--theme-transparent {
    color: var(--common-color-unaccented-medium);
    background-color: transparent;
  }

  // TEXT STYLE
  &--text-style-text {
    color: var(--common-color-text-main);
  }

  &--text-style-inverted {
    color: var(--common-color-text-inverted);

    &#{$parent}--theme-transparent {
      box-shadow: inset 0 0 0 1px var(--common-color-text-inverted);
    }
  }

  // STATES
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

  &--flat {
    border-radius: 0;
  }
}
</style>
