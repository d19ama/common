<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';
import { useMagicKeys } from '@vueuse/core';
import {
  CommonButton,
  CommonTitle,
} from '../';
import { useCommonModalStore } from './composables';
import type {
  CommonModalProps,
  CommonModalSlots,
} from './types';
import type { HTMLElementClass } from '@/types';
import { useComponentId } from '@/common/composables';
import { COMMON_GLOBAL_PROP_SIZE_DEFAULT } from '@/constants';

const props = withDefaults(defineProps<CommonModalProps>(), {
  title: '',
  rounded: true,
  appendTo: 'body',
  important: false,
  size: COMMON_GLOBAL_PROP_SIZE_DEFAULT,
});

const slots = defineSlots<CommonModalSlots>();

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
} = useCommonModalStore();

const titleId = useComponentId('modal-title');

const id = ref<symbol>(Symbol('PaModal'));

const isActive = computed<boolean>(() => {
  return active.value !== undefined && active.value.id === id.value;
});

const hasOverlay = computed<boolean>(() => {
  return visible.value
    && props.size !== 'full-page'
    && props.size !== 'full-container';
});

const hasHeader = computed<boolean>(() => {
  return !!slots.header! || props.title;
});

const elementClass = computed<HTMLElementClass>(() => {
  const isNotFullSize: boolean = props.size !== 'full-page'
    && props.size !== 'full-container';

  return [
    `common-modal--size-${props.size}`,
    {
      'common-modal--rounded': props.rounded && isNotFullSize,
    },
  ];
});

function close(): void {
  if (props.important) {
    return;
  }

  if (slots.container) {
    return;
  }

  if (props.close !== undefined) {
    props.close();
    return;
  }

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
    if (typeof document === 'undefined') {
      return;
    }

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
      class="common-modal__overlay"
      @click="close"
    />

    <div
      v-if="visible"
      class="common-modal"
      :class="elementClass"
      role="dialog"
      :aria-labelledby="props.title ?? titleId"
      aria-modal="true"
      v-bind="$attrs"
    >
      <div class="common-modal__container">
        <slot name="container">
          <div class="common-modal__control">
            <slot name="control">
              &nbsp;
            </slot>
            <slot
              name="close"
              :close="close"
            >
              <CommonButton
                v-if="!props.important"
                class="common-modal__button-close"
                auto-width
                size="xs"
                theme="icon"
                @click="close"
              >
                <slot name="close-icon">
                  <span class="common-modal__button-close-icon icon icon-cross" />
                </slot>
              </CommonButton>
            </slot>
          </div>
          <div
            v-if="hasHeader"
            class="common-modal__header"
          >
            <slot name="header">
              <CommonTitle
                tag="h4"
                role="heading"
              >
                {{ title }}
              </CommonTitle>
            </slot>
          </div>

          <div
            v-if="$slots.default"
            class="common-modal__body"
          >
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="common-modal__footer"
          >
            <slot
              name="footer"
              :close="close"
            />
          </div>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
@import './assets/styles/index.scss';

.common-modal {
  $parent: &;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: .25rem;
  padding-right: .25rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
    background-color: var(--common-modal-overlay-background);
    backdrop-filter: var(--common-modal-overlay-backdrop-filter);
  }

  &__control,
  &__header,
  &__footer {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  &__control {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &__button-close {
    flex-shrink: 0;
    margin-left: auto;
  }

  &__button-close-icon {
    font-size: 1rem;
  }

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    max-height: 90vh;
    width: inherit;
    height: auto;
    padding-top: 1rem;
    padding-bottom: 2rem;
    position: relative;
    overflow: hidden;
    background-color: var(--common-modal-container-background);
    pointer-events: auto;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 1rem;
  }

  &__body {
    flex-grow: 1;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 2rem;
    white-space: pre-line;
  }

  &__footer {
    padding-top: 1rem;
  }

  // SIZES
  &--size-xs {
    padding-left: 1rem;
    padding-right: 1rem;

    #{$parent}__control,
    #{$parent}__header,
    #{$parent}__footer {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    #{$parent}__body {
      padding: 0 1rem 1rem;
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

  &--size-full-container {
    padding-left: 0;
    padding-right: 0;
    position: absolute;

    #{$parent}__container {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
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

  &--size-xs,
  &--size-sm,
  &--size-md,
  &--size-lg,
  &--size-xl,
  &--size-full-width,
  &--size-full-container,
  &--size-full-page {
    @media only screen and (max-width: $common-breakpoint-sm) {
      #{$parent}__control,
      #{$parent}__header,
      #{$parent}__footer {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      #{$parent}__header {
        padding-bottom: 1rem;
      }

      #{$parent}__footer {
        padding-top: 1rem;
      }

      #{$parent}__body {
        padding: 0 1rem 1rem;
      }

      #{$parent}__container {
        padding-bottom: 1rem;
      }
    }
  }

  // STYLES
  &--rounded {

    #{$parent}__container {
      border-radius: var(--common-border-radius);
    }
  }
}
</style>
