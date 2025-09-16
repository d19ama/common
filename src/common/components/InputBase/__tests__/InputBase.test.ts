import {
  describe,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import InputBase from '../InputBase.vue';

describe('component InputBase', () => {
  it('выводится', () => {
    const wrapper = mount<typeof InputBase>(InputBase, {});

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });
});
