import {
  computed,
  ref,
} from 'vue';

type CommonModal = {
  id: symbol;
};

const _items = ref<CommonModal[]>([]);

export function useCommonModalStore() {
  const items = computed<CommonModal[]>(() => {
    return _items.value;
  });

  function add(payload: CommonModal): void {
    _items.value = [
      ..._items.value.filter((dialog) => dialog.id !== payload.id),
      payload,
    ];
  }

  function remove<T extends Pick<CommonModal, 'id'>>(payload: T): void {
    _items.value = _items.value.filter((dialog) => dialog.id !== payload.id);
  }

  const active = computed<CommonModal | undefined>(() => {
    return _items.value[_items.value.length - 1];
  });

  return {
    items,
    active,
    add,
    remove,
  };
}
