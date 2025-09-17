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
  header: '',
  body: '',
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

const buttonClass = computed<HTMLElementClass>(() => {
  return {
    'icon-folder-open': currentState.value,
    'app-accordion-item__button--active': currentState.value,
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
      <span
        class="app-accordion-item__button icon icon-folder"
        :class="buttonClass"
      />
      <slot name="header">
        {{ props.header }}
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
            {{ props.body }}
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.app-accordion-item {
  border-bottom: 1px solid var(--color-secondary);
  transition: background-color var(--transition);

  &__header {
    display: flex;
    flex-flow: row nowrap;
    gap: 0 .5rem;
    padding: 1rem 2rem 1rem 1rem;
    position: relative;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 700;
    color: var(--color-black);
    text-decoration: none;
    transition: background-color var(--transition), color var(--transition);
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--color-black);
      background-color: var(--color-white);
    }

    &:active {
      color: var(--color-black);
      background-color: var(--color-white);
    }
  }

  &__button {
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
    border-radius: 50%;
  }

  &__body {
    padding: 1rem;
    transition: background-color var(--transition);

    &--active {
      background-color: var(--color-white);
    }
  }

  &__content {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
}
</style>
