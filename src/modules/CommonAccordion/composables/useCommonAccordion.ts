import { ref } from 'vue';
import type { CommonAccordionItemType } from '../components/CommonAccordionItem/types';

type State = Map<string, boolean>;

const state = ref<State>(new Map());

export function useCommonAccordion() {
  function add(item: CommonAccordionItemType): void {
    state.value.set(item.name, item.active);
  }

  function toggle(name: CommonAccordionItemType['name']): void {
    const current = state.value.get(name);

    state.value.set(name, !current);
  }

  function toggleAll(name: CommonAccordionItemType['name']): void {
    state.value.forEach((value, key) => {
      state.value.set(key, key === name && !value);
    });
  }

  return {
    state,
    add,
    toggle,
    toggleAll,
  };
}
