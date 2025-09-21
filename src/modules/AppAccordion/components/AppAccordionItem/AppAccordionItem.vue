<script lang="ts" setup>
import {
  computed,
  onMounted,
} from 'vue';
import Velocity from 'velocity-animate';
import { useAppAccordion } from '../../composables';
import type {
  AppAccordionItemProps,
  AppAccordionItemSlots,
} from './types';
import { componentName } from '@/helpers/component-name';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<AppAccordionItemProps>(), {
  headerText: '',
  bodyText: '',
});

defineSlots<AppAccordionItemSlots>();

const DURATION: number = 300;

const {
  state,
  add,
  toggle,
} = useAppAccordion();

const name = componentName('app-accordion-item');

const currentState = computed<boolean>(() => {
  return !!state.value.get(name);
});

const headerClass = computed<HTMLElementClass>(() => {
  return {
    'app-accordion-item__header--active': currentState.value,
  };
});

const iconClass = computed<HTMLElementClass>(() => {
  return {
    'icon-folder-open': currentState.value,
  };
});

const bodyClass = computed<HTMLElementClass>(() => {
  return {
    'app-accordion-item__body--active': currentState.value,
  };
});

function toggleItem(): void {
  toggle(name);
}

function animationEnter(el: Element): void {
  Velocity(
    el,
    'slideDown',
    {
      duration: DURATION,
    },
  );
}

function animationLeave(el: Element): void {
  Velocity(
    el,
    'slideUp',
    {
      duration: DURATION,
    },
  );
}

onMounted(() => {
  add({
    name,
    active: false,
  });
});
</script>

<template>
  <div class="app-accordion-item">
    <div
      class="app-accordion-item__header"
      :class="headerClass"
      @click="toggleItem"
    >
      <slot name="header">
        <slot name="header-text">
          {{ props.headerText }}
        </slot>
        <slot name="icon">
          <span
            class="app-accordion-item__icon icon icon-folder"
            :class="iconClass"
          />
        </slot>
      </slot>
    </div>
    <Transition
      @enter="animationEnter"
      @leave="animationLeave"
    >
      <div
        v-if="currentState"
        class="app-accordion-item__body"
        :class="bodyClass"
      >
        <div class="app-accordion-item__content">
          <slot name="body">
            {{ props.bodyText }}
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.app-accordion-item {
  border-bottom: var(--app-accordion-item-border-bottom);
  transition: background-color var(--common-transition);

  &__header {
    display: flex;
    flex-flow: row nowrap;
    gap: 0 .5rem;
    padding: 1rem 2rem 1rem 1rem;
    position: relative;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 700;
    color: var(--app-accordion-header-color);
    text-decoration: none;
    background: var(--app-accordion-header-bg);
    transition: background var(--common-transition), color var(--common-transition);
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--app-accordion-header-color-hover);
      background: var(--app-accordion-header-bg-hover);
    }

    &--active {
      color: var(--app-accordion-header-color-active);
      background: var(--app-accordion-header-bg-active);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 100%;
    overflow: hidden;
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    font-size: 1rem;
    font-style: normal;
    color: var(--app-accordion-icon-color);
    border-radius: 50%;
  }

  &__body {
    padding: 1rem;
    background: var(--app-accordion-body-bg);
    transition: background var(--common-transition);

    &--active {
      background: var(--app-accordion-body-bg-active);
    }
  }

  &__content {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    color: var(--common-color-text-main);
  }
}
</style>
