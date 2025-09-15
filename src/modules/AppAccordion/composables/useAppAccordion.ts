import {
  type Ref,
  ref,
} from 'vue';
import type { AppAccordionItemType } from '@/common/components';

type State = Map<string, boolean>;

interface UseAppAccordionReturn {
  state: Ref<State>;
  add: (item: AppAccordionItemType) => void;
  toggle: (name: AppAccordionItemType['name']) => void;
}

const state = ref<State>(new Map());

export function useAppAccordion(): UseAppAccordionReturn {
  function add(item: AppAccordionItemType): void {
    state.value.set(item.name, item.active);
  }

  function toggle(name: AppAccordionItemType['name']): void {
    state.value.forEach((value, key) => {
      state.value.set(key, key === name && !value);
    });
  }

  return {
    state,
    add,
    toggle,
  };
}
