<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';
import { useMagicKeys } from '@vueuse/core';
import {
  AppButton,
  AppTitle,
} from '../';
import { useModalStore } from './composables';
import type {
  AppModalProps,
  AppModalSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { useComponentId } from '@/common/composables';
import { GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<AppModalProps>(), {
  title: '',
  rounded: true,
  appendTo: 'body',
  size: GLOBAL_PROP_SIZE_DEFAULT,
});

const slots = defineSlots<AppModalSlots>();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const {
  escape,
} = useMagicKeys();

const {
  add,
  remove,
  active,
} = useModalStore();

const titleId = useComponentId('modal-title');

const id = ref<symbol>(Symbol('PaModal'));

const isActive = computed<boolean>(() => {
  return active.value !== undefined && active.value.id === id.value;
});

const hasOverlay = computed<boolean>(() => {
  return visible.value && props.size !== 'full-page';
});

const hasHeader = computed<boolean>(() => {
  return !!slots.header! || props.title;
});

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-modal--size-${props.size}`,
    {
      'app-modal--rounded': props.rounded && props.size !== 'full-page',
    },
  ];
});

function close(): void {
  visible.value = false;
}

watch(
  visible,
  (value) => {
    if (value) {
      add({
        id: id.value,
      });
    } else {
      remove({
        id: id.value,
      });
    }
  },
  {
    immediate: true,
  },
);

watch(() => escape?.value, () => {
  close();
});

watch(
  active,
  (value) => {
    document.body.style.overflow = value !== undefined
      ? 'hidden'
      : '';
  },
  {
    immediate: true,
  },
);
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <Teleport
    v-if="isActive"
    :to="props.appendTo"
  >
    <div
      v-if="hasOverlay"
      class="app-modal__overlay"
      @click="close"
    />

    <div
      v-if="visible"
      class="app-modal"
      :class="elementClass"
      role="dialog"
      :aria-labelledby="props.title ?? titleId"
      aria-modal="true"
      v-bind="$attrs"
    >
      <div class="app-modal__container">
        <div class="app-modal__control">
          <slot name="control" />
          <AppButton
            class="app-modal__button-close icon icon-cross"
            auto-width
            theme="transparent"
            @click="close"
          />
        </div>
        <div
          v-if="hasHeader"
          class="app-modal__header"
        >
          <slot name="header">
            <AppTitle
              tag="h4"
              role="heading"
            >
              {{ title }}
            </AppTitle>
          </slot>
        </div>

        <div
          v-if="$slots.default"
          class="app-modal__body"
        >
          <slot />
        </div>

        <div
          v-if="$slots.footer"
          class="app-modal__footer"
        >
          <slot
            name="footer"
            :close="close"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.app-modal {
  $parent: &;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: .25rem;
  padding-right: .25rem;
  z-index: 999;
  pointer-events: none;

  @media only screen and (min-width: $common-breakpoint-sm) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  &__overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: var(--common-color-black-50);
    backdrop-filter: blur(2px);
  }

  &__control {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-right: .5rem;
    padding-left: 2rem;
  }

  &__button-close {
    flex-shrink: 0;
    margin-left: auto;
  }

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    max-height: 90vh;
    width: inherit;
    height: auto;
    padding-bottom: 2rem;
    position: relative;
    overflow: hidden;
    background-color: var(--common-color-white);
    pointer-events: auto;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    padding-right: 2rem;
    padding-left: 2rem;
  }

  &__body {
    flex-grow: 1;
    padding: 2rem;
    white-space: pre-line;
  }

  &__footer {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  // SIZES
  &--size-xs {
    padding-left: 1rem;
    padding-right: 1rem;

    #{$parent}__control {
      padding-left: 1rem;
    }

    #{$parent}__header,
    #{$parent}__footer {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    #{$parent}__body {
      padding: 1rem;
    }

    #{$parent}__container {
      width: 22rem;
      padding-bottom: 1rem;
    }
  }

  &--size-sm {
    padding-left: 1rem;
    padding-right: 1rem;

    #{$parent}__container {
      width: 33.25rem;
    }
  }

  &--size-md {
    padding-left: 1rem;
    padding-right: 1rem;

    #{$parent}__container {
      width: 44.875rem;
    }
  }

  &--size-lg {
    padding-left: 1rem;
    padding-right: 1rem;

    #{$parent}__container {
      width: 62.125rem;
    }
  }

  &--size-xl {
    padding-left: 1rem;
    padding-right: 1rem;

    #{$parent}__container {
      width: 100%;
    }
  }

  &--size-full-width {
    padding-left: 0;
    padding-right: 0;

    #{$parent}__container {
      max-width: 100vw;
      width: 100vw;
    }
  }

  &--size-full-page {
    width: 100vw;
    height: 100vh;
    padding-left: 0;
    padding-right: 0;

    #{$parent}__container {
      max-width: 100vw;
      max-height: 100vh;
      width: 100vw;
      height: 100vh;
    }
  }

  @media only screen and (max-width: $common-breakpoint-md) {
    &--size-xs,
    &--size-sm,
    &--size-md,
    &--size-lg,
    &--size-xl {}
  }

  // STYLES
  &--rounded {

    #{$parent}__container {
      border-radius: var(--common-border-radius);
    }
  }
}
</style>
