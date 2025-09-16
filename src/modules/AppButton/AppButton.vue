<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type {
  AppButtonEmits,
  AppButtonProps,
  AppButtonSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppButtonProps>(), {
  test: '',
  size: 'm',
  theme: 'red',
  tag: 'button',
  to: undefined,
  type: 'button',
  rounded: false,
  disabled: false,
  download: false,
  autoWidth: false,
  downloadName: 'file',
});

const emit = defineEmits<AppButtonEmits>();

defineSlots<AppButtonSlots>();

const router = useRouter();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-button--size-${props.size}`,
    `app-button--theme-${props.theme}`,
    {
      'app-button--rounded': props.rounded,
      'app-button--disabled': props.disabled,
      'app-button--auto-width': props.autoWidth,
    },
  ];
});

const hrefValue = computed<string | undefined>(() => {
  return props.tag === 'a'
    ? props.href
    : undefined;
});

const targetValue = computed<string | undefined>(() => {
  return (props.tag === 'a' && props.blank)
    ? '_blank'
    : undefined;
});

const downloadValue = computed<string | undefined>(() => {
  return (props.tag === 'a' && props.download)
    ? props.downloadName
    : undefined;
});

function onClick(event: Event): void {
  if (props.tag === 'button') {
    event.preventDefault();
  }

  if (props.to) {
    router.push({
      name: props.to,
    });

    return;
  }

  emit('click', event);
}
</script>

<template>
  <Component
    :is="props.tag"
    class="app-button"
    :href="hrefValue"
    :type="props.type"
    :class="elementClass"
    :target="targetValue"
    :download="downloadValue"
    :disabled="props.disabled"
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
  transition: background-color var(--transition), color var(--transition);
  user-select: none;
  cursor: pointer;

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  &--rounded {
    border-radius: .5rem;
  }

  &--auto-width {
    width: auto;
  }

  &--size-s {
    padding: .25rem .5rem;
    font-size: .75rem;
    font-weight: 500;
    line-height: 1.5;
  }

  &--size-m {
    padding: .5rem 1rem;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5;
  }

  &--size-l {
    padding: .75rem 1.5rem;
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.5;
  }

  // Themes
  &--theme-red {
    color: var(--color-white);
    background-color: var(--color-red);

    &:hover {
      background-color: var(--color-red-dark);
    }
  }

  &--theme-transparent {
    color: var(--color-black);
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
