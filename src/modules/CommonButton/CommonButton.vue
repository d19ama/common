<script setup lang="ts">
import { computed } from 'vue';
import type {
  CommonButtonEmits,
  CommonButtonProps,
  CommonButtonSlots,
  CommonButtonTag,
} from './types';
import { CommonSpinner } from '@/modules';
import type { HTMLElementClass } from '@/types';
import { COMMON_GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';
import {
  COMMON_GLOBAL_PROP_TEXT_STYLE_DEFAULT,
  COMMON_GLOBAL_PROP_THEME_DEFAULT,
  COMMON_GLOBAL_PROP_THEME_STYLE_DEFAULT,
} from '@/constants/global-props';

const props = withDefaults(defineProps<CommonButtonProps>(), {
  flat: false,
  tag: 'button',
  type: 'button',
  loading: false,
  disabled: false,
  download: false,
  autoWidth: false,
  target: '_blank',
  downloadName: 'file',
  size: COMMON_GLOBAL_PROP_SIZE_DEFAULT,
  theme: COMMON_GLOBAL_PROP_THEME_DEFAULT,
  textStyle: COMMON_GLOBAL_PROP_TEXT_STYLE_DEFAULT,
  themeStyle: COMMON_GLOBAL_PROP_THEME_STYLE_DEFAULT,
});

const emit = defineEmits<CommonButtonEmits>();

defineSlots<CommonButtonSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `common-button--size-${props.size}`,
    `common-button--theme-${props.theme}`,
    `common-button--text-style-${props.textStyle}`,
    `common-button--theme-style-${props.themeStyle}`,
    {
      'common-button--flat': props.flat,
      'common-button--loading': props.loading,
      'common-button--disabled': props.disabled,
      'common-button--auto-width': props.autoWidth,
    },
  ];
});

const componentTag = computed<CommonButtonTag>(() => {
  if (props.to || props.tag === 'RouterLink') {
    return 'RouterLink';
  }

  if (props.href || props.tag === 'a') {
    return 'a';
  }

  return 'button';
});

const attrs = computed<CommonButtonProps>(() => {
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
    class="common-button"
    :class="elementClass"
    @click="onClick"
  >
    <CommonSpinner
      v-if="props.loading"
      class="common-button__spinner"
      size="xs"
    />
    <template v-else>
      <span class="common-button__inner">
        <slot name="prepend" />

        <slot>
          {{ props.text }}
        </slot>

        <slot name="append" />
      </span>
    </template>
  </Component>
</template>

<style lang="scss">
.common-button {
  $parent: &;

  &[type='button'],
  &[type='reset'],
  &[type='submit'] {
    -webkit-appearance: button;
  }

  &:-moz-focusring,
  &[type='button']:-moz-focusring,
  &[type='reset']:-moz-focusring,
  &[type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  &::-moz-focus-inner,
  &[type='button']::-moz-focus-inner,
  &[type='reset']::-moz-focus-inner,
  &[type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  gap: 0 6px;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  border-radius: var(--common-button-border-radius);
  transition:
    filter var(--common-transition),
    color var(--common-transition),
    border var(--common-transition),
    background-color var(--common-transition);
  user-select: none;
  cursor: pointer;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    gap: 0 .375rem;
    font-weight: 400;
    font-family: inherit;
    line-height: 1.5;
    text-transform: none;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
  }

  &__spinner {
    filter: brightness(.8);
  }

  // SIZES
  &--size-xs {
    font-size: .625rem;

    #{$parent}__inner {
      height: 2rem;
      padding: 0 .25rem;
    }

    #{$parent}__spinner {
      width: 1rem;
      height: 1rem;
    }
  }

  &--size-sm {
    font-size: .75rem;

    #{$parent}__inner {
      height: 2.5rem;
      padding: 0 .5rem;
    }

    #{$parent}__spinner {
      width: 1rem;
      height: 1rem;
    }
  }

  &--size-md {
    font-size: .875rem;

    #{$parent}__inner {
      height: 3rem;
      padding: 0 .75rem;
    }
  }

  &--size-lg {
    font-size: 1rem;

    #{$parent}__inner {
      height: 3.5rem;
      padding: 0 1rem;
    }
  }

  &--size-xl {
    font-size: 1.125rem;

    #{$parent}__inner {
      height: 4rem;
      padding: 0 1.25rem;
    }
  }

  &:hover {
    filter: saturate(1.3);
  }

  // THEMES
  &--theme-primary {
    color: var(--common-color-primary-dark);

    &#{$parent}--theme-style-fill {
      border: var(--common-button-border-width) solid var(--common-color-primary-light);
      background-color: var(--common-color-primary-light);
    }

    &#{$parent}--theme-style-outline {
      border: var(--common-button-border-width) solid var(--common-color-primary-light);
      background-color: transparent;
    }
  }

  &--theme-secondary {
    color: var(--common-color-secondary-dark);

    &#{$parent}--theme-style-fill {
      border: var(--common-button-border-width) solid var(--common-color-secondary-light);
      background-color: var(--common-color-secondary-light);
    }

    &#{$parent}--theme-style-outline {
      border: var(--common-button-border-width) solid var(--common-color-secondary-light);
      background-color: transparent;
    }
  }

  &--theme-tertiary {
    color: var(--common-color-tertiary-dark);

    &#{$parent}--theme-style-fill {
      border: var(--common-button-border-width) solid var(--common-color-tertiary-light);
      background-color: var(--common-color-tertiary-light);
    }

    &#{$parent}--theme-style-outline {
      border: var(--common-button-border-width) solid var(--common-color-tertiary-light);
      background-color: transparent;
    }
  }

  &--theme-unaccented {
    color: var(--common-color-main);

    &#{$parent}--theme-style-fill {
      border: var(--common-button-border-width) solid var(--common-color-unaccented-medium);
      background-color: var(--common-color-unaccented-medium);

      &:hover {
        border: var(--common-button-border-width) solid var(--common-color-unaccented-dark);
        background-color: var(--common-color-unaccented-dark);
      }
    }

    &#{$parent}--theme-style-outline {
      border: var(--common-button-border-width) solid var(--common-color-unaccented-medium);
      background-color: transparent;

      &:hover {
        border: var(--common-button-border-width) solid var(--common-color-unaccented-dark);
      }
    }
  }

  &--theme-transparent {
    color: var(--common-color-unaccented-medium);
    border: var(--common-button-border-width) solid transparent;
    background-color: transparent;
  }

  &--theme-icon {
    padding: 0;
    color: var(--common-color-unaccented-medium);
    border: var(--common-button-border-width) solid transparent;
    background-color: transparent;
  }

  // TEXT STYLES
  &--text-style-text {
    color: var(--common-color-main);
  }

  &--text-style-inverted {
    color: var(--common-color-inverted);

    &#{$parent}--theme-transparent {
      border: var(--common-button-border-width) solid var(--common-color-inverted);
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
