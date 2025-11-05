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
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';
import {
  GLOBAL_PROP_TEXT_STYLE_DEFAULT,
  GLOBAL_PROP_THEME_DEFAULT,
} from '@/constants/global-props';

const props = withDefaults(defineProps<AppButtonProps>(), {
  flat: false,
  tag: 'button',
  type: 'button',
  loading: false,
  disabled: false,
  download: false,
  autoWidth: false,
  target: '_blank',
  downloadName: 'file',
  size: GLOBAL_PROP_SIZE_DEFAULT,
  theme: GLOBAL_PROP_THEME_DEFAULT,
  textStyle: GLOBAL_PROP_TEXT_STYLE_DEFAULT,
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
      size="xs"
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
  overflow: hidden;
  width: 100%;
  gap: 0 6px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  border: 0;
  outline: 0;
  border-radius: var(--app-button-border-radius);
  transition: filter var(--common-transition), color var(--common-transition), background-color var(--common-transition);
  user-select: none;
  cursor: pointer;

  &__spinner {
    filter: brightness(.8);
  }

  // SIZES
  &--size-xs {
    height: 2rem;
    padding: 0 .125rem;
    font-size: .625rem;

    #{$parent}__spinner {
      width: 1rem;
      height: 1rem;
    }
  }

  &--size-sm {
    height: 2.5rem;
    padding: 0 .5rem;
    font-size: .75rem;

    #{$parent}__spinner {
      width: 1rem;
      height: 1rem;
    }
  }

  &--size-md {
    height: 3rem;
    padding: 0 .75rem;
    font-size: .875rem;
  }

  &--size-lg {
    height: 3.5rem;
    padding: 0 1rem;
    font-size: 1rem;
  }

  &--size-xl {
    height: 4rem;
    padding: 0 1.25rem;
    font-size: 1.125rem;
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
    color: var(--common-color-main);
    background-color: var(--common-color-unaccented-medium);

    &:hover {
      background-color: var(--common-color-unaccented-dark);
    }
  }

  &--theme-transparent {
    color: var(--common-color-unaccented-medium);
    background-color: transparent;
  }

  &--theme-icon {
    padding: 0;
    color: var(--common-color-unaccented-medium);
    background-color: transparent;
  }

  // TEXT STYLES
  &--text-style-text {
    color: var(--common-color-main);
  }

  &--text-style-inverted {
    color: var(--common-color-inverted);

    &#{$parent}--theme-transparent {
      box-shadow: inset 0 0 0 1px var(--common-color-inverted);
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
