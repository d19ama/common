import {
  describe,
  expect,
  it,
} from 'vitest';
import { mount } from '@vue/test-utils';
import {
  defineComponent,
  h,
  nextTick,
  ref,
} from 'vue';
import type { CommonSelectOption } from '../types';
import { CommonSelect } from '../index';

function makeOptions(): CommonSelectOption[] {
  return [
    {
      id: '1',
      text: 'One',
      selected: false,
      disabled: false,
    },
    {
      id: '2',
      text: 'Two',
      selected: false,
      disabled: false,
    },
    {
      id: '3',
      text: 'Three',
      selected: false,
      disabled: true,
    },
  ];
}

function mountWithVModel(props: Record<string, unknown> = {}) {
  const value = ref<string | string[]>(props.multiple
    ? []
    : '');
  const options = ref(makeOptions());

  const Wrapper = defineComponent({
    setup() {
      return () => {
        // @ts-expect-error pass
        return h(CommonSelect, {
          ...props,
          'value': value.value,
          'onUpdate:value': (newValue: string | string[]) => {
            value.value = newValue;
          },
          'options': options.value,
          'onUpdate:options': (newOptions: CommonSelectOption[]) => {
            options.value = newOptions;
          },
        });
      };
    },
  });

  const wrapper = mount(Wrapper);

  return {
    wrapper,
    value,
    options,
  };
}

describe('commonSelect', () => {
  it('shows placeholder when nothing selected', () => {
    const {
      wrapper,
    } = mountWithVModel({
      placeholder: 'Choose...',
    });

    expect(wrapper.find('.select-base__placeholder').exists()).toBe(true);
    expect(wrapper.find('.select-base__placeholder').text()).toBe('Choose...');
  });

  it('opens dropdown on click and closes on outside click', async () => {
    const {
      wrapper,
    } = mountWithVModel();

    expect(wrapper.find('.dropdown').exists()).toBe(false);

    await wrapper.find('.select-base__control').trigger('click');
    await nextTick();

    expect(wrapper.find('.dropdown').exists()).toBe(true);

    document.body.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
    }));
    await nextTick();

    expect(wrapper.find('.dropdown').exists()).toBe(false);
  });

  it('selects an option, updates v-model:value and closes dropdown (single mode)', async () => {
    const {
      wrapper,
      value,
    } = mountWithVModel();

    await wrapper.find('.select-base__control').trigger('click');
    await nextTick();

    const items = wrapper.findAll('.dropdown__item');
    expect(items.length).toBe(3);

    await items[0].trigger('click');
    await nextTick();

    expect(value.value).toBe('1');
    expect(wrapper.find('.dropdown').exists()).toBe(false);
    expect(wrapper.find('.select-base__selected').text()).toBe('One');
  });

  it('does not select disabled option on click', async () => {
    const {
      wrapper,
      value,
    } = mountWithVModel();

    await wrapper.find('.select-base__control').trigger('click');
    await nextTick();

    const items = wrapper.findAll('.dropdown__item');
    await items[2].trigger('click');
    await nextTick();

    expect(value.value).toBe('');
    expect(wrapper.find('.dropdown').exists()).toBe(true);
  });

  it('respects disabled prop - dropdown does not open', async () => {
    const {
      wrapper,
    } = mountWithVModel({
      disabled: true,
    });

    await wrapper.find('.select-base__control').trigger('click');
    await nextTick();

    expect(wrapper.find('.dropdown').exists()).toBe(false);
  });

  it('supports multiple selection, accumulating values and keeping dropdown open', async () => {
    const {
      wrapper,
      value,
    } = mountWithVModel({
      multiple: true,
    });

    await wrapper.find('.select-base__control').trigger('click');
    await nextTick();

    let items = wrapper.findAll('.dropdown__item');
    await items[0].trigger('click');
    await nextTick();

    expect(value.value).toEqual([
      '1',
    ]);
    expect(wrapper.find('.dropdown').exists()).toBe(true);

    items = wrapper.findAll('.dropdown__item');
    await items[1].trigger('click');
    await nextTick();

    expect(value.value).toEqual([
      '1',
      '2',
    ]);
    expect(wrapper.find('.select-base__selected').text()).toBe('One, Two');
  });

  it('reflects externally changed value back into options selection', async () => {
    const {
      wrapper,
      value,
    } = mountWithVModel();

    value.value = '2';
    await nextTick();

    expect(wrapper.find('.select-base__selected').text()).toBe('Two');
  });

  it('shows validation error text via errorText prop', () => {
    const {
      wrapper,
    } = mountWithVModel({
      required: true,
      errorText: 'This field is required',
    });

    expect(wrapper.find('.input-base__error').exists()).toBe(true);
    expect(wrapper.find('.input-base__error').text()).toBe('This field is required');
  });

  it('does not render dropdown items while loading', async () => {
    const {
      wrapper,
    } = mountWithVModel({
      loading: true,
    });

    await wrapper.find('.select-base__control').trigger('click');
    await nextTick();

    expect(wrapper.find('.dropdown__items').exists()).toBe(false);
  });
});
