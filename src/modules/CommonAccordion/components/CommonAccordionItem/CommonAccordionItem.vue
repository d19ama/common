<script lang="ts" setup>
import {
  computed,
  inject,
  onMounted,
} from 'vue';
import { useCommonAccordion } from '../../composables';
import type {
  CommonAccordionItemProps,
  CommonAccordionItemSlots,
} from './types';
import type { HTMLElementClass } from '@/types';

const props = withDefaults(defineProps<CommonAccordionItemProps>(), {
  active: false,
  headerText: '',
  bodyText: '',
});

defineSlots<CommonAccordionItemSlots>();

const multiple = inject<boolean>('multiple');

const {
  state,
  add,
  toggle,
  toggleAll,
} = useCommonAccordion();

const currentState = computed<boolean>(() => {
  return !!state.value.get(props.name);
});

const headerClass = computed<HTMLElementClass>(() => {
  return {
    'common-accordion-item__header--active': currentState.value,
  };
});

const iconClass = computed<HTMLElementClass>(() => {
  return {
    'icon-folder-open': currentState.value,
  };
});

const bodyClass = computed<HTMLElementClass>(() => {
  return {
    'common-accordion-item__body--active': currentState.value,
  };
});

function toggleItem(): void {
  if (multiple) {
    toggle(props.name);
    return;
  }

  toggleAll(props.name);
}

// Форсирует reflow элемента, чтобы браузер зафиксировал текущее значение
// стиля до последующего его изменения — это необходимо для корректного
// запуска CSS-transition при переключении высоты.
function forceReflow(element: HTMLElement): void {
  void element.offsetHeight;
}

// Раскрытие/скрытие реализовано на нативных CSS‑transition через управление
// высотой элемента, чтобы не тянуть в бандл сторонние библиотеки анимации
// и не иметь побочных эффектов при серверном рендеринге (SSR).
function animationEnter(element: Element): void {
  const htmlElement = element as HTMLElement;

  htmlElement.style.height = '0';
  forceReflow(htmlElement);
  htmlElement.style.height = `${htmlElement.scrollHeight}px`;
}

function animationAfterEnter(element: Element): void {
  const htmlElement = element as HTMLElement;

  htmlElement.style.height = '';
}

function animationLeave(element: Element): void {
  const htmlElement = element as HTMLElement;

  htmlElement.style.height = `${htmlElement.scrollHeight}px`;
  forceReflow(htmlElement);
  htmlElement.style.height = '0';
}

onMounted(() => {
  add({
    name: props.name,
    active: props.active,
  });
});
</script>

<template>
  <div class="common-accordion-item">
    <div
      class="common-accordion-item__header"
      :class="headerClass"
      @click="toggleItem"
    >
      <slot name="header">
        <slot name="header-text">
          {{ props.headerText }}
        </slot>
        <slot name="icon">
          <span
            class="common-accordion-item__icon icon icon-folder"
            :class="iconClass"
          />
        </slot>
      </slot>
    </div>
    <Transition
      @enter="animationEnter"
      @after-enter="animationAfterEnter"
      @leave="animationLeave"
    >
      <div
        v-if="currentState"
        class="common-accordion-item__body"
        :class="bodyClass"
      >
        <slot name="body">
          <div class="common-accordion-item__content">
            <slot name="content">
              {{ props.bodyText }}
            </slot>
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@import '../../assets/styles/index.scss';

.common-accordion-item {
  border-bottom: var(--common-accordion-item-border-bottom);
  border-radius: var(--common-accordion-item-border-radius);
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
    color: var(--common-accordion-header-color);
    text-decoration: none;
    background: var(--common-accordion-header-bg);
    transition: background var(--common-transition), color var(--common-transition);
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--common-accordion-header-color-hover);
      background: var(--common-accordion-header-bg-hover);
    }

    &--active {
      color: var(--common-accordion-header-color-active);
      background: var(--common-accordion-header-bg-active);
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
    color: var(--common-accordion-icon-color);
    border-radius: 50%;
  }

  &__body {
    overflow: hidden;
    background: var(--common-accordion-body-bg);
    transition: background var(--common-transition), height var(--common-transition);

    &--active {
      background: var(--common-accordion-body-bg-active);
    }
  }

  &__content {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    padding: 1rem;
    color: var(--common-color-main);
  }
}
</style>
