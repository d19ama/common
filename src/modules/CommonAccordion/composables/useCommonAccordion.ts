import {
  type Ref,
  ref,
} from 'vue';
import type { CommonAccordionItemType } from '../components/CommonAccordionItem/types';

type State = Map<string, boolean>;

interface UseCommonAccordionReturn {
  state: Ref<State>;
  add: (item: CommonAccordionItemType) => void;
  toggle: (name: CommonAccordionItemType['name']) => void;
}

const state = ref<State>(new Map());

export function useCommonAccordion(): UseCommonAccordionReturn {
  function add(item: CommonAccordionItemType): void {
    state.value.set(item.name, item.active);
  }

  function toggle(name: CommonAccordionItemType['name']): void {
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
